const httpStatus = require("http-Status");
const {
  insert,
  fetchAll,
  fetchOne,
  edit,
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
    const deletedContact = await deleteAndSave(id);
    res.status(httpStatus.OK).send(deletedContact);
  } catch (err) {
    console.log(`err`, err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

module.exports = { getAll, getSingle, create, update, remove };
