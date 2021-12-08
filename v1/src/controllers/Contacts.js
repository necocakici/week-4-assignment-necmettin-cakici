const httpStatus = require("http-Status");
const { insert, fetchAll } = require("../services/Contacts");

const getAll = async (req, res) => {
  try {
    const allProjects = await fetchAll();
    res.status(httpStatus.OK).send(allProjects);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getSingle = (req, res) => {
  const { id } = req.params;
  res.send(`GET record with id ${id}`);
};

const create = async (req, res) => {
  try {
    const result = await insert(req.body);
    console.log(`result`, result);
    res.status(httpStatus.CREATED).send(result);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const update = (req, res) => {
  const { id } = req.params;
  const { name, phoneNumber } = req.body;
  res.send(`${id} Name ${name}, phoneNumber ${phoneNumber}`);
};

const remove = (req, res) => {
  const { id } = req.params;
  res.send(`Delete record with id ${id}`);
};

module.exports = { getAll, getSingle, create, update, remove };
