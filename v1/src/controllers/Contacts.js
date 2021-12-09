const httpStatus = require("http-Status");
const {
  insert,
  fetchAll,
  fetchOne,
  deleteAndSave,
} = require("../services/Contacts");

const getAll = async (req, res) => {
  try {
    const allContacts = await fetchAll();
    res.status(httpStatus.OK).send(allContacts);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await fetchOne(id);
    res.status(httpStatus.OK).send(contact);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
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

const remove = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedContact = await deleteAndSave(id);
    res.status(httpStatus.OK).send(deletedContact);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = { getAll, getSingle, create, update, remove };
