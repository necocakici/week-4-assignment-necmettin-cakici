const httpStatus = require("http-Status");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const {
  insert,
  fetchAll,
  fetchOne,
  deleteAndSave,
  edit,
} = require("../services/Users");

const login = async (req, res) => {
  const { body } = req;
  try {
    const user = await fetchOne({ username: body.username });
    if (user) {
      console.log(`user`, user);
      const bytes = CryptoJS.AES.decrypt(user.password, "myHashKey");
      const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      console.log(`de`, decryptedPassword);
      if (body.password === decryptedPassword) {
        const token = jwt.sign({ user }, "tokensecretkey", { expiresIn: "1w" });
        res.status(200).send(token);
      } else {
        res.status(400).send("Şifre hatalı");
      }
    } else {
      res.status(400).send("Böyle bir e-mail'e kayıtlı kullanıcı yok.");
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(500).send(err);
  }
};

/*const login = async (req, res) => {
  try {
    const user = await User.login(req.body);
    if (user.username) {
      res.status(httpStatus.OK).send(user);
    } else {
      res.status(httpStatus.BAD_REQUEST).send(user);
    }
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send("err");
  }
};*/

const getAll = async (req, res) => {
  try {
    const allUsers = await fetchAll();
    res.status(httpStatus.OK).send(allUsers);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await fetchOne({ _id: id });
    res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const create = async (req, res) => {
  let { body } = req;
  try {
    const result = await insert(body);
    res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const result = await edit(id, body);
    res.status(httpStatus.OK).send(result);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await deleteAndSave(id);
    res.status(httpStatus.OK).send(deleted);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = { getAll, getSingle, create, update, remove, login };
