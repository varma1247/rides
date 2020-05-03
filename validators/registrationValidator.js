const Joi = require("@hapi/joi");
module.exports = {
  registrationValidator: Joi.object({
    username: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.{8,})"))
      .message(
        "Invalid Username: minimum 8 chararcters with atleast 1 alphabet and 1 digit"
      )
      .empty()
      .alphanum()
      .min(8)
      .required()
      .messages({
        "string.base": "Username should be of type string",
        "string.alphanum":
          "Invalid Username (Special characters are not allowed)",
        "string.min": "Invalid Username (Minimun 8 characters)",
        "string.empty": "Username cannot be empty",
        "any.required": "Username is required",
      }),
    email: Joi.string()
      .pattern(new RegExp("@mavs.uta.edu$"))
      .message("Invalid email (Enter valid UTA email id)")
      .required()
      .empty()
      .messages({
        "string.base": "Email should be of type string",
        "any.required": "Email is required",
        "string.empty": "Email cannot be empty",
      }),
    password: Joi.string()
      .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"))
      .message(
        "Invalid Password: minimum 8 chararcters with atleast 1 lowercase, 1 uppercase and 1 digit"
      )
      .required()
      .empty()
      .messages({
        "string.base": "Password should be of type string",
        "any.required": "Password is required",
        "string.empty": "Password cannot be empty",
      }),
    firstname: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]{1,20}$/)
      .empty()
      .message("Invalid Firstname: Only alphabets are allowed")
      .messages({
        "string.base": "Firstname should be of type string",
        "any.required": "Firstname is required",
        "string.empty": "Firstname cannot be empty",
      }),
    lastname: Joi.string()
      .required()
      .pattern(/^[a-zA-Z]{1,20}$/)
      .empty()
      .message("Invalid Lastname: Only alphabets are allowed")
      .messages({
        "string.base": "Lastname should be of type string",
        "any.required": "Lastname is required",
        "string.empty": "Lastname cannot be empty",
      }),
    imageurl: Joi.string().empty().messages({
      "string.base": "imageurl should be of type string",
      "string.empty": "imageurl cannot be empty",
    }),
  }),
};
