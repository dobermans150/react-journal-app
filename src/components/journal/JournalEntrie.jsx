import React from 'react'
import { DateTime } from 'luxon'

export const JournalEntrie = ( { id, date, title, body, url } ) => {

    const { weekdayLong, day,  } = DateTime.fromMillis( date, { locale: 'en' } )

    return (
        <div className="journal__entry cursor pointer">
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
