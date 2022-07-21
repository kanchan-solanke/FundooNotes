import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
const router = express.Router();

//route to get all users
router.post('/login', userController.userlogin);

//route to create a new user
router.post('', newUserValidator, userController.newUser);

export default router;
