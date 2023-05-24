import USER from "../Model/USER";
import { responseObj } from "../utils";

export const userProfile = async (req, res) => {
    try {
        const findUser = await USER.findById(req.user._id).select("-password");
        console.log(findUser);
    return res.status(201).json({
      ...responseObj,
      message: "Profile fetch Successfully",
      response: {
        User: findUser,
      },
    });
    }
    catch (error) {
        
    }
  
}
