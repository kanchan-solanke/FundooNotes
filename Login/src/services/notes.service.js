import Note from '../models/notes.model';


//create new note
export const addNotes = async (body) => {
    const data = await Note.create(body);
    return data;
};

// get all note
export const getAllNotes = async (body) => {
    const data = await Note.find({UserID : body.UserID});
    return data;
};

// get single note
export const getNote = async (id,body) => {
const data = await Note.findById({_id:id, UserID : body.UserID});
    if (data == null) {
        throw new Error("Note gets null")
    }
    else {
        return data
    }

};

// update single note
export const updateNotes = async (id,UserID) => {
    const data = await Note.findByIdAndUpdate({_id:id ,UserID :UserID}, body, {new : true})
};

// delete single note
export const deleteNotes = async (id,UserID) => {
    await Note.findByIdAndDelete({ _id: id , UserID : UserID});
}

//isArchieved
export const archieveNotes = async (id,UserID) => {
    console.log("It is userID",UserID + " "+ "It is id", id)

    const data = await Note.findByIdAndUpdate({_id:id ,UserID :UserID}, {isArchived : true}, {new : true})
    return data;
};

//isdeleted
export const isTrash = async (id,UserID) => {
    const data = await Note.findByIdAndUpdate({_id:id ,UserID :UserID}, {isDeleted: true}, {new : true})
    return data;
};

