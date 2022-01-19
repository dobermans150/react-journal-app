import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploadingFile } from '../../actions/notes'

export const NotesAppBar = () => {
    const dispatch = useDispatch()
    const { active: noteActive } = useSelector( state => state.notes )

    const handleSave = () => {
        dispatch( startSaveNote( noteActive ) )
    }

    const handlePictureClick = () => {
        document.querySelector( '#fileSelector' ).click()
    }

    const handleFileChange = ( e ) => {
        const file = e.target.files[ 0 ];

        if ( file ) {
            dispatch( startUploadingFile( file ) )
            e.target.value = ""
        }
    }

    return (
        <div className="notes__appbar">
            <span>28 de agosto 2022</span>

            <input
                id="fileSelector"
                name="file"
                type="file"
                style={ { display: 'none' } }
                onChange={ handleFileChange }
            />

            <div>
                <button
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>
                <button
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
        </div>
    )
}
