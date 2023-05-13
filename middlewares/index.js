import jwt from 'express-jwt';

export const requireSignin = jwt({
  secret: process.env.JWTSECRET,
  getToken: (req, res) => req.cookies.user_token	,
  algorithms: ['HS256']
});
