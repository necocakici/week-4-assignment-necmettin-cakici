const Joi = require("joi");

const createValidation = Joi.object({
  username: Joi.string().min(5).required(),
  password: Joi.string().length(8).required(),
});

module.exports = {
  createValidation,
};
