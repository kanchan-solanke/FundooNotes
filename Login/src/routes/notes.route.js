import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { notesValidator } from '../validators/notes.validator';
import { userAuth} from '../middlewares/auth.middleware'
import * as redis from '../middlewares/redis.middlewear'
const router = express.Router();

//route to get all users
router.get('/allNotes',userAuth,redis.redis_Notes,notesController.getAllNotes);

//route to create a new user
router.post('',notesValidator,userAuth, notesController.addNotes);

//update user
router.put('/:id',userAuth,notesController.updateNotes);

//delete user
router.delete('/:id',userAuth,notesController.deleteNotes)

//get a single note
router.get('/:id',userAuth,notesController.getNote)

//is archieve note
router.put('/:id/isArchieve',userAuth, notesController.archieveNotes)

// deleted notes
router.put('/:id/isDeleted',userAuth, notesController.isTrash)


export default router;