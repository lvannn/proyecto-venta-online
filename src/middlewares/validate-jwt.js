const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const User = require("../models/user.model");
require("dotenv").config
const secret = process.env.SECRET_KEY

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).send({
      message: "No existe ningun token",
    });
  }

  try {
    const payload = jwt.decode(token, secret);
    console.log(payload)
    const registroEncontrado = await User.findById(payload.uId);
    console.log(registroEncontrado);
    
    if (payload.exp <= moment().unix()) {
      return res.status(500).send({ message: "El token ya ha expirado" });
    }

    if (!registroEncontrado) {
      return res.status(401).send({
        message: "No se ha validado el token",
      });
    }

    req.regist = registroEncontrado;  

    next();
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { validateJWT };