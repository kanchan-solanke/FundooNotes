import HttpStatus from 'http-status-codes';
import * as UserService from '../services/user.service'

export const userlogin = async (req, res) => {
  try {
    const data = await UserService.userlogin(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User login successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

export const newUser = async (req, res) => {
  try {
    const data = await UserService.newUser(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'User created successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`

    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const data = await UserService.forgetPassword(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      message: 'Email sent successfully'
    });
  } catch (error) {
    res.status(HttpStatus.NOT_FOUND).json({
      code: HttpStatus.NOT_FOUND,
      message: 'email not found',
    });
  }
};

export const resetPassword = async(req,res,next) => {
try{
  const data = await UserService.resetPassword(req.body)
  res.status(HttpStatus.OK).json({
    code: HttpStatus.OK,
    data:data,
    message: 'reset password successfully'
});
}catch (error) {
next(error);
}
};
