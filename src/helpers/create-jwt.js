const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const generateJWT = async (uId, name, email, rol) => {
  const payload = { uId, name, email, rol };
  try {
    const token = await jwt.sign(payload, secret, {
      expiresIn: "3h",
    });
    return token;
  } catch (error) {
    throw new Error(`No se pudo generar el token ${error}`);
  }
};

module.exports = { generateJWT };