const HttpException = require("../exceptions/httpexception");
const PersonModel = require('../models/Person')

const createPerson = async ({ name, email, age }) => {
  const person = await PersonModel.create({ name, email, age })
  return person;
}

const getPerson = async (_id) => {
  const foundPerson = await PersonModel.findById(_id)
  if (foundPerson == null) throw new HttpException(404, `Person with id of ${_id} was not found`)
  return foundPerson
}

const updatePerson = async ({ _id, name, email, age }) => {
  const updated = await PersonModel.findOneAndUpdate({ _id }, { name, email, age }, { new: true })
  return updated
}

const deletePerson = async (_id) => {
  await PersonModel.findByIdAndRemove(_id)
}

module.exports = {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson
}