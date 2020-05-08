const Joi = require("@hapi/joi");
module.exports = {
  commentValidator: Joi.object({
    content: Joi.string().empty().min(1).max(100).required().messages({
      "string.base": "Content should be of type string",
      "string.min": "Comment cannot be empty",
      "string.max": "Comment too long!! max 100 characters...",
      "string.empty": "Comment cannot be empty",
      "any.required": "Comment cannot be empty",
    }),
  }),
};
