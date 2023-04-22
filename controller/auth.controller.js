import models from "../database/model/index.js";

export const userSignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await models.Users.create({
      name,
      email,
      password,
    });
    res.status(200).json("Successfully Signed Up");
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
