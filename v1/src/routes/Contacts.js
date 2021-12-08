const express = require("express");
const {
  create,
  getAll,
  getSingle,
  update,
  remove,
} = require("../controllers/Contacts");
const router = express.Router();

router.get("/", getAll);

router.get("/:id", getSingle);

router.post("/", create);

router.put("/:id", update);

router.delete("/:id", remove);

module.exports = router;
