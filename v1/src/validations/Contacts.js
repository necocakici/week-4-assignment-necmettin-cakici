const Joi = require("joi");

const createValidation = Joi.object({
  name: Joi.string().min(2).required(),
  phoneNumber: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

module.exports = {
  createValidation,
};
