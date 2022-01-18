import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { NotesAppBar } from './NotesAppBar'
import { activeNote } from "../../actions/notes";

export const NoteScreen = () => {

    /* Only edit the title, body and image url of the note */
    const { active: { id, date, ...note } } = useSelector( state => state.notes )
    const dispatch = useDispatch()
    const [ formValues, handleInputChange, reset ] = useForm( note );
    const { title, body, url } = formValues;

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

    return (
        <div className="notes__main-content">
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

                { ( url )
                    && (
                        <div className="notes__image">
                            <img
                                alt="imagen"
                                src="https://neliosoftware.com/es/wp-content/uploads/sites/3/2018/07/aziz-acharki-549137-unsplash-1200x775.jpg"
                            />
                        </div>
                    )

                }
            </div>
        </div>
    )
}
