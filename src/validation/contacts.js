import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  phoneNumber: Joi.string().required().messages({
    'string.base': 'Phone number must be a string',
    'any.required': 'Phone number is required',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Invalid email format',
    'any.required': 'Email is required',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'any.required': 'Contact type is required',
      'any.only': 'Contact type must be one of [work, home, personal]',
    }),
});

export const patchContactSchema = Joi.object({
  name: Joi.string().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must have at least {#limit} characters',
    'string.max': 'Name must have at most {#limit} characters',
  }),
  phoneNumber: Joi.string().messages({
    'string.base': 'Phone number must be a string',
  }),
  email: Joi.string().email().messages({
    'string.email': 'Invalid email format',
  }),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'any.only': 'Contact type must be one of [work, home, personal]',
  }),
}).min(1);
