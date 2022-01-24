const Users = require("../models/Users");
const UsersDeleted = require("../models/usersDeleted");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { sign } = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { firstName, password, email } = req.body;

  try {
    await bcrypt.hash(password, 10).then(async (hash) => {
      const newUser = new Users({
        firstName: firstName,
        email: email,
        password: hash,
      });
      const user = await newUser.save();
      const accessToken = sign(
        {
          success: true,
          data: {
            firstName: user.firstName,
            id: user.id,
            email: user.email,
            profilePicture: user.profilePicture,
          },
        },
        "importantsecret",
        { expiresIn: 100 }
      );
      res.json({
        success: true,
        data: {
          firstName: user.firstName,
          id: user.id,
          email: user.email,
          profilePicture: user.profilePicture,
          token: accessToken,
        },
      });
    });
  } catch (err) {
    console.log("testing the err", err);
    res.json({
      success: false,
      message: err,
    });
  }
});

// login
router.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const user = await Users.findOne({
    email: req.body.email,
  });

  if (!user) res.json({ success: false, message: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then(async (match) => {
    if (!match)
      res.json({
        success: false,
        error: "Wrong firstName And Password Combination",
      });

    const accessToken = sign(
      {
        success: true,
        data: {
          firstName: user.firstName,
          id: user.id,
          email: user.email,
          profilePicture: user.profilePicture,
        },
      },
      "importantsecret"
      // { expiresIn: 100 }
    );
    res.json({
      success: true,
      data: {
        firstName: user.firstName,
        id: user.id,
        email: user.email,
        profilePicture: user.profilePicture,
        token: accessToken,
      },
    });
  });
});

// updateUser
router.post("/updateUser/:id", validateToken, async (req, res) => {
  const { password, email, firstName } = req.body;
  const _id = req.params.id;
  const option = { new: true };
  console.log("testing works", _id);

  try {
    await Users.findByIdAndUpdate(
      _id,
      {
        firstName,
        email,
      },
      option
    ).then((user) => {
      if (!user) return res.send({ success: false, message: "user not found" });

      const accessToken = sign(
        {
          success: true,
          data: {
            firstName: user.firstName,
            id: user.id,
            email: user.email,
            profilePicture: user.profilePicture,
          },
        },
        "importantsecret"
        // { expiresIn: 100 }
      );
      return res.send({
        success: true,
        message: "user updated successfully",
        data: {
          firstName: user.firstName,
          id: user.id,
          email: user.email,
          profilePicture: user.profilePicture,
          token: accessToken,
        },
      });
    });
  } catch (err) {
    return res.send({ success: false, message: err });
  }
});

// update profile pic
router.post("/updateProfilePic/:id", validateToken, async (req, res) => {
  const { profilePicture } = req.body;
  const _id = req.params.id;
  const option = { new: true };
  console.log("testing works", _id);

  try {
    await Users.findByIdAndUpdate(
      _id,
      {
        profilePicture,
      },
      option
    ).then((user) => {
      if (!user) return res.send({ success: false, message: "user not found" });

      const accessToken = sign(
        {
          success: true,
          data: {
            firstName: user.firstName,
            id: user.id,
            email: user.email,
            profilePicture: user.profilePicture,
          },
        },
        "importantsecret"
        // { expiresIn: 100 }
      );
      return res.send({
        success: true,
        message: "user updated successfully",
        data: {
          firstName: user.firstName,
          id: user.id,
          email: user.email,
          profilePicture: user.profilePicture,
          token: accessToken,
        },
      });
    });
  } catch (err) {
    return res.send({ success: false, message: err });
  }
});

// delete user
router.post("/deleteUser/:id", async (req, res) => {
  const _id = req.params.id;
  const { firstName, profilePicture, email } = req.body;

  const delUser = new UsersDeleted({
    firstName: firstName,
    email: email,
    profilePicture: profilePicture,
  });
  await delUser.save();
  await Users.findOneAndRemove(
    {
      _id,
    },
    function (err) {
      if (err) {
        res.json({
          success: false,
          message: err,
        });
      }
      res.json({
        success: true,
        message: "User deleted success",
      });
    }
  );
});

// check auth
router.get("/getAuth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

router.put("/changepassword", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({
    where: { firstName: req.user.firstName },
  });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.updateOne(
        { password: hash },
        { where: { firstName: req.user.firstName } }
      );
      res.json("SUCCESS");
    });
  });
});

module.exports = router;
