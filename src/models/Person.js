const { Schema, model } = require('mongoose')

const PersonSchema = new Schema({
 name: { type: String, required: true },
 email: { type: String, required: true },
 age: { type: Number, required: true },
})

module.exports = model('Person', PersonSchema)