import jwt from 'express-jwt';
import USER from '../Model/USER';
import { responseObj } from "../utils";


export const requireSignin = jwt({
  secret: process.env.JWTSECRET,
  getToken: (req, res) => req.cookies.user_token	,
  algorithms: ['HS256']
});
export const checkClient = async (req, res,next) => {
  try {
    
    const user = await USER.findById(req?.user?._id)
    if (!user) {
      return res.status(401).json({
        ...responseObj,
        message:"Please login to continue!!!!!!"
      })
    }
    const isClient = user?.role.includes("Client")
    if (!isClient) {
     return res.status(401).json({
      ...responseObj,
      message: "You are not authorized",
    });
    }
     return  next()
    
      
    
  
  }catch(error){}
  //check user then role if Client allow if not 403
}

export const checkAdmin = async (req, res, next) => {
  try {
      const user = await USER.findById(req?.user?._id)
    if (!user) {
      return res.status(401).json({
        ...responseObj,
        message:"Please login to continue!!!!!!"
      })
    }
    const isAdmin = user?.role.includes("Admin")
     if (!isAdmin) {
     return res.status(401).json({
      ...responseObj,
      message: "You are not an Admin",
    });
    }
    return next()
  }catch(error){}
}