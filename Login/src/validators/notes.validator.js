
import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';

export const notesValidator = (req, res, next) => {
  const schema = Joi.object({
    Title: Joi.string().required(),
    Descreption: Joi.string().required(),
    color: Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`,
    });
  } else {
    req.validatedBody = value;
    next();
  }
};