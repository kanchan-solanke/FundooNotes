import HttpStatus from 'http-status-codes';
import * as notesService from '../services/notes.service';
/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */

export const addNotes = async (req, res, next) => {
    try {
        const data = await notesService.addNotes(req.body.UserID);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'note created successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

export const getAllNotes = async (req,res) => {
    try {
        const data = await notesService.getAllNotes(req.body.UserID);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'User get Notes successfully'
        });

      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          message: `${error}`

        });

    }}
    //get a single note
    export const getNote = async (req,res) => {
      try {
          const data = await notesService.getNote(req.params.id,req.body.UserID);
          res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: data,
            message: 'User get  a Note successfully'
          });
  
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
  
          });
  
      }}

    export const updateNotes = async (req, res) => {
        try {
          const data = await notesService.updateNotes(req.params.id, req.body.UserID);
          res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Notes updated successfully'
          });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
      
          });
        }
    }

    export const deleteNotes = async (req, res) => {
        try {
          const data = await notesService.deleteNotes(req.params.id,req.body.UserID);
          console.log("data",data);
          res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Notes deleted successfully'
          });
        } catch (error) {
          res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
      
          });
        }
    }

    export const archieveNotes = async(req,res,next) =>{
      try{
          const data = await notesService.archieveNotes(req.params.noteid,req.body.UserID);
          res.status(HttpStatus.ACCEPTED).json({
              code: HttpStatus.ACCEPTED,
              data:data,
              message: 'Notes Archived successfully'
          });
      }catch (error) {
          next(error);
      }
  }
  
  export const isTrash = async(req,res,next) =>{
      try{
          const data = await notesService.isTrash(req.params.id,req.body.UserID);
          res.status(HttpStatus.OK).json({
              code: HttpStatus.OK,
              data:data,
              message: 'Notes Moved to Trash successfully'
          });
      }catch (error) {
          next(error);
      }
  }

  