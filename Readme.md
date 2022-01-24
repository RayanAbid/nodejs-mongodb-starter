## Nodejs MonogoDB-starter.

This repo is a nodejs starter with **JWT**, **Mongoose/MongoDB**, **registration**, **Login**, and **checkAuth** already setup.

### Get started

To get started run `npm i` it will install the following dependencies

```
"dependencies": {
  "bcrypt": "^5.0.1",
  "cors": "^2.8.5",
  "dotenv": "^14.2.0",
  "express": "^4.17.2",
  "jsonwebtoken": "^8.5.1",
  "mongoose": "^6.1.7"
},
"devDependencies": {
  "nodemon": "^2.0.15"
}
```

While the dependencies are installing let's setup our MongoDB instance.

- Visit this [link]("https://www.mongodb.com/cloud/atlas/lp/try2?utm_content=controlhterms&utm_source=google&utm_campaign=gs_emea_pakistan_search_core_brand_atlas_desktop&utm_term=mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624545&adgroup=115749718983&gclid=Cj0KCQiAubmPBhCyARIsAJWNpiMJMK9NxFshIL4r4dGpTuVNOCevIZfXbGFKOWfDaC6b-WrMG0eOB2EaAlw5EALw_wcB") Signup/login with your account.

- Select the free plan
  ![1_n9p2WJxsqv_eFUM69WSZvw.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643032870074/v-2ZCAxXU.png)

- Create a new cluster.

![1__rko3kzd-_NuoS2Kh0_d4A.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643032943583/TDqOMXLgJ.png)

- Create a user for Database Access so that we can access our db. On the left sidebar under “SECURITY” click on Database Access.

![1_Q_izTp_v-g_E0k_6wfxKUQ.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643032968728/VQlEgOtEl.png)

- Add a user

![1_Cw17U_3yXKccsw48G1d5mQ.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643033003836/3Z3-xy_Sd.png)

- After you have added a user. Click connect

![1_XKNfmUBa96fMXWHkb14EDw.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643033095541/2qmLgOVUk.png)

- You might have to add an IP address we will type 0.0.0.0/0, this will allow access to all the IPs.
  so that anyone can access it.

![1_pfd5IDvvx-9gat8bCRPO-A.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643033138783/pEv053vL6m.png)

![1_8RGqNB1eWH4ws5K90388Gw.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643033148503/qcuQ9AmGne.png)

- After adding the IP address, we choose a connection method.

![1_23_Vp4TgwZxU1piCTlGGGA.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643033225330/NVp68SBOSw.png)

- Select the 2nd option, this will give us a connection string which we have to update it with our username and password that we created earlier.

![1_BM_xSLIttnh8-d3pokhSlQ.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643033253391/-rmLW6llB.png)

**Paste that URL in the .env file**

run `npm run dev` your project should get started. You should see the following in your cli.

![Screenshot 2022-01-24 at 6.50.08 PM.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1643032214845/tQX0ik7wqR.png)

**Hurray!** That means your app is running.
