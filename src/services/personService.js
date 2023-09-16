const HttpException = require("../exceptions/httpexception");
const PersonModel = require('../models/Person')

const createPerson = async ({ name }) => {
  const person = await PersonModel.create({ name })
  return person;
}

const getPerson = async (_id) => {
  const foundPerson = await PersonModel.findById(_id)
  if (foundPerson == null) throw new HttpException(404, `Person with id of ${_id} was not found`)
  return foundPerson
}

const updatePerson = async ({ _id, name }) => {
  const updated = await PersonModel.findOneAndUpdate({ _id }, { name }, { new: true })
  return updated
}

const deletePerson = async (_id) => {
  const res = await PersonModel.findByIdAndRemove(_id)
  if (res == null) throw new HttpException(400, `Delete failed. Person with ID [${_id}] does not exist`)
}

module.exports = {
  createPerson,
  getPerson,
  updatePerson,
  deletePerson
}