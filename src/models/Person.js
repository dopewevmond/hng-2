const { Schema, model } = require('mongoose')

const PersonSchema = new Schema({
 name: { type: String, required: true }
})

module.exports = model('Person', PersonSchema)