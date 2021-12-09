const express = require("express");
const {
  create,
  getAll,
  getSingle,
  update,
  remove,
  login,
} = require("../controllers/Users");
const { validate } = require("../middlewares/validate");
const { createValidation } = require("../validations/Users");
const router = express.Router();

router.get("/", getAll);

router.get("/:id", getSingle);

router.post("/", validate(createValidation), create);

router.post("/login", login);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;
