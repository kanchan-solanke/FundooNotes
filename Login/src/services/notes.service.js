import Note from '../models/notes.model';
//create new note
export const addNotes = async (body) => {
    const data = await Note.create(body);
    return data;
};

// get all note
export const getAllNotes = async () => {
    const data = await Note.find();
    return data;
};

// get single note
export const getNote = async (id) => {
    const data = await Note.findById({_id:id});
    if (data == null) {
        throw new Error("Note gets null")
    }
    else {
        return data

    }

};

// update single note
export const updateNotes = async (id,body) => {
    const data = await Note.findByIdAndUpdate({_id:id}, body, {new : true})
};

// delete single note
export const deleteNotes = async (id) => {
    await Note.findByIdAndDelete({ _id: id });
}