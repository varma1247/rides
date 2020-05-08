const Joi = require("@hapi/joi");
module.exports = {
  postValidator: Joi.object({
    content: Joi.string().empty().min(1).max(100).required().messages({
      "string.base": "Content should be of type string",
      "string.min": "Post cannot be empty",
      "string.max": "Message too long!! max 100 characters...",
      "string.empty": "Post cannot be empty",
      "any.required": "Post cannot be empty",
    }),
    likes: Joi.number().empty().messages({
      "string.base": "Likes should be a number",
      "string.empty": "Likes cannot be empty",
    }),
    user:Joi.string().empty().required().messages({
      "string.base": "User should be of type string",
      "string.empty": "User cannot be empty",
      "any.required": "User cannot be empty",
    })
  }),
};
