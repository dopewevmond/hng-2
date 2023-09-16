const { object, string } = require('yup')

const personSchema = object().shape({
  name: string().required('Name is missing from request')
})

module.exports = personSchema