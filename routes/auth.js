import express  from "express";
import models from "../database/model/index.cjs"

const router=express.Router()

const user=(req,res)=>{
    models.Users.sync().then(() => {
          console.log("User Model synced");
        });
    res.json({respnse:"respnserespnse"})

}
router.get("/user",user)




export default router