const addContact = require("../../model/contacts/addContact");
const { joiContactSchema } = require("../../validation");

const add = async (req, res, next) => {
  try {
    const {error} = joiContactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    const newContact = await addContact(req.body);
    res.status(201).json({
      newContact
    })
  }
  catch(error) {
    next(error)
  }
}

module.exports = add;