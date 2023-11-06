const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const bcrypt = require('bcrypt');
module.exports.GenerateSignature = async (name, email, pancard) => {
  try {
    const token = await jwt.sign({ name, email, pancard }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (error) {
    console.log(`error in jwt ${error}`);
    return null;
  }
};

module.exports.GeneratePassword= async(password)=>{
    let hashedPassowrd= await bcrypt.hash(password,10);
    return hashedPassowrd;
}
module.exports.ComparePassword= async(enteredPassword,password)=>{
    let hashedPassowrd=await bcrypt.comapre(enteredPassword,password);
    return hashedPassowrd;
}

module.exports.verifySignature= async(token)=>{
    return await jwt.verify(token,JWT_SECRET);

}
