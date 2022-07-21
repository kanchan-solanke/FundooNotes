import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { notesValidator } from '../validators/notes.validator';
import {userAuth} from '../middlewares/auth.middleware'

const router = express.Router();

//route to get all users
router.get('',userAuth,notesController.getAllNotes);

//route to create a new user
router.post('',notesValidator,userAuth, notesController.addNotes);

//update user
router.put('/:id',userAuth,notesController.updateNotes);

//delete user
router.delete('/:id',userAuth,notesController.deleteNotes)

//get a single note
router.get('/:id',userAuth,notesController.getNote)

export default router;