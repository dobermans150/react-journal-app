import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'
import { activeNote, startDeleting } from "../../actions/notes";

export const NoteScreen = () => {

    /* Only edit the title, body and image url of the note */
    const { active: { id, date, ...note } } = useSelector( state => state.notes )
    const dispatch = useDispatch()
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body } = formValues;

    const activeId = useRef( id )

    useEffect( () => {

        if ( activeId.current !== id ) {
            reset( note )
            activeId.current = id;
        }


    }, [ id, activeId, note, reset ] );


    useEffect( () => {
        dispatch( activeNote( id, { id, date, ...formValues } ) );
    }, [ formValues, id, date, dispatch ] )


    const handleDelete = () => {
        dispatch( startDeleting( id ) );
    }
    return (
        <div className="notes__main-content animate__animated animate__fadeIn animated__faster">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />

                <textarea
                    name="body"
                    placeholder="What happened today"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                >

                </textarea>

                { ( note.url )
                    && (
                        <div className="notes__image">
                            <img
                                alt="imagen"
                                src={ note.url }
                            />
                        </div>
                    )

                }
            </div>

            <button
                className="btn btn-danger"
                onClick={ handleDelete }
            >
                Delete
            </button>
        </div>
    )
}
