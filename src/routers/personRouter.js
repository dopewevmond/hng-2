const { Router } = require("express");
const {
  getPerson,
  updatePerson,
  createPerson,
  deletePerson,
} = require("../services/personService");
const validate = require("../middleware/validate");
const personSchema = require("../validationSchema/personSchema");

const personRouter = Router();

personRouter.get("/:id", async (req, res, next) => {
  try {
    const person = await getPerson(req.params.id);
    res.json(person);
  } catch (err) {
    next(err);
  }
});

personRouter.put("/:id", validate(personSchema), async (req, res, next) => {
  try {
    const { name } = req.body;
    const updated = await updatePerson({
      _id: req.params.id,
      name,
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

personRouter.post("/", validate(personSchema), async (req, res, next) => {
  try {
    const { name } = req.body;
    const person = await createPerson({ name });
    res.status(201).json(person);
  } catch (err) {
    next(err);
  }
});

personRouter.delete("/:id", async (req, res, next) => {
  try {
    await deletePerson(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = personRouter