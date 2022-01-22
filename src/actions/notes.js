import { db } from "../firebase/firebase-config";
import { collection, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import Swal from "sweetalert2";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { fileUpload } from "../helpers/fileUpload";



/* Add new note to the user in firebase */
export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const doc = await addDoc( collection( db, `${uid}/journal/notes` ), newNote )

        dispatch( activeNote( doc.id, newNote ) );
        dispatch(addNewNote(doc.id, newNote ) );

    }

}

/* Get all notes of the user from firebase*/
export const startGetAllNotes = () => {
    return async ( dispatch, getState ) => {
        const uid = getState().auth.uid
        const notes = await loadNotes( uid )

        dispatch( setNotes( notes ) );
    }
}


/* Update a note in firebase*/
export const startSaveNote = ( note ) => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth

        if ( !note.url ) {
            delete note.url
        }

        const noteToFireStore = { ...note }
        delete noteToFireStore.id

        const noteRef = doc( db, `${uid}/journal/notes/${note.id}` )

        await updateDoc( noteRef, noteToFireStore );

        dispatch( refreshNotes( note.id, noteToFireStore ) );
        Swal.fire( 'Saved', note.title, 'success' );
    }

}

/* Upload File to CLoudinary and update the active note state */
export const startUploadingFile = ( file ) => {
    return async ( dispatch, getState ) => {
        const { active: activeNote } = getState().notes;
        Swal.fire( {
            title: 'Uploading...',
            text: 'Please Wait',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading()
            },


        } )

        const fileUrl = await fileUpload( file )
        activeNote.url = fileUrl

        dispatch( startSaveNote( activeNote ) )

        Swal.close()

    }
}

/* Dele a note in firebase */
export const startDeleting = ( id ) => {
    return async ( dispatch, getState ) => {

        const uid = getState().auth.uid;
        const docRef = doc( db, `${uid}/journal/notes/${id}` );
        await deleteDoc( docRef )

        dispatch( deleteNote( id ) );

    }
}

/* Set active note in the state */
export const activeNote = ( id, note ) => ( {
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
} )

/* Add a new note in the state of notes */
export const addNewNote = ( id, note ) => ( {
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
} )

/*Get all notes of the user*/
export const setNotes = ( notes ) => ( {
    type: types.notesLoad,
    payload: [
        ...notes
    ]
} )

/* Update a note */
export const refreshNotes = ( id, note ) => ( {
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
} )

/* Delete a note in the state */
export const deleteNote = ( id ) => ( {
    type: types.notesDelete,
    payload: id
} )

/* Delete all notes and active note in the state after logout */
export const noteLogout = () => ( {
    type: types.notesLogoutCleaning,
} )