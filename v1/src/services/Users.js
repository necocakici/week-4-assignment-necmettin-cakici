const User = require("../models/User");

const fetchAll = () => {
  return User.find();
};

const fetchOne = (where) => {
  return User.findOne(where);
};

const insert = (userData) => {
  // Kayıt.
  const newUser = User(userData);
  return newUser.save();
};

const edit = (id, userData) => {
  return Contact.findByIdAndUpdate(id, userData);
};

const deleteAndSave = (id) => {
  return User.findByIdAndDelete(id);
};

module.exports = { fetchAll, fetchOne, insert, edit, deleteAndSave };
