const Contact = require("../models/Contact");

const fetchAll = () => {
  return Contact.find();
};

const insert = (contactData) => {
  // Kayıt.
  const newContact = Contact(contactData);
  return newContact.save();
};

module.exports = { fetchAll, insert };
