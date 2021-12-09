const Contact = require("../models/Contact");

const fetchAll = () => {
  return Contact.find();
};

const fetchOne = (id) => {
  return Contact.findById(id);
};

const insert = (contactData) => {
  // Kayıt.
  const newContact = Contact(contactData);
  return newContact.save();
};

const deleteAndSave = (id) => {
  return Contact.findByIdAndDelete(id);
};

module.exports = { fetchAll, fetchOne, insert, deleteAndSave };
