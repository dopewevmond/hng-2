const { object, string, number } = require('yup')

const personSchema = object().shape({
  name: string().required('Name is missing from request'),
  email: string().email('Email is invalid').required('Email is missing from request'),
  age: string().min(0, 'Age cannot be less than 0').typeError('Age provided is not a number').required('Age is missing from request')
})

module.exports = personSchema