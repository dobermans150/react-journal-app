import React from 'react'
import { DateTime } from 'luxon'
import { useDispatch } from 'react-redux'
import { activeNote } from '../../actions/notes'

export const JournalEntry = ( { id, date, title, body, url } ) => {

    const dispatch = useDispatch()
    /* Hey Luxon give me the Week day name and the number day in english pls */
    /* Use Luxon to transform the date from milliseconds to a valid format*/
    const { weekdayLong, day } = DateTime.fromMillis( date, { locale: 'en', } )

    const handleEntryClick = () => {
        const notes = {
            id,
            date,
            title,
            body,
            url
        }

        dispatch( activeNote( id, notes ) )
    }

    return (
        <div
            className="journal__entry cursor pointer"
            onClick={ handleEntryClick }
        >
            {
                url && (
                    <div
                        className="journal__entry-picture"
                        style={ {
                            backgroundSize: 'cover',
                            backgroundImage: `url(${url})`
                        } }

                    >
                    </div>
                )
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    { title }
                </p>

                <p className="journal__entry-content">
                    { body }
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{ weekdayLong }</span>
                <h4>{ day }</h4>
            </div>
        </div>
    )
}
