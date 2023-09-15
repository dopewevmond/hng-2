const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body)
    return next()
  } catch (err) {
    return res.status(400).json({ type: err.type, message: err.message })
  }
}

module.exports = validate