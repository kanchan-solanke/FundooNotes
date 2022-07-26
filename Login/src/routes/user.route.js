import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { resetAuth } from '../middlewares/auth.middleware';

const router = express.Router();



//route to create a new user
router.post('', newUserValidator, userController.newUser);

//route to get all users
router.post('/login', userController.userlogin);

//forget Password
router.post('/forgetPassword', userController.forgetPassword);

//reset Password
router.post('/:token', resetAuth, userController.resetPassword)


export default router;
