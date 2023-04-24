import bcrypt from "bcrypt";

//hashing and comparing password

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    //genSalt 8,12 14
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        console.log("error salt regejct");
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

//comapred hased password and return the true or false
export const comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};