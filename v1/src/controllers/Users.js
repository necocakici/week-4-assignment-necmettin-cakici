const httpStatus = require("http-Status");
const User = require("../models/User");
const {
  insert,
  fetchAll,
  fetchOne,
  deleteAndSave,
  edit,
} = require("../services/Users");

const login = async (req, res) => {
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
};

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
    const user = await fetchOne(id);
    res.status(httpStatus.OK).send(user);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const create = async (req, res) => {
  try {
    const result = await insert(req.body);
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
