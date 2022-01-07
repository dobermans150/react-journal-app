import React from 'react'

export const JournalEntrie = () => {
    return (
        <div className="journal__entry cursor pointer">
            <div
                className="journal__entry-picture"
                style={ {
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://neliosoftware.com/es/wp-content/uploads/sites/3/2018/07/aziz-acharki-549137-unsplash-1200x775.jpg)'
                } }
            >
            </div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo dia
                </p>

                <p className="journal__entry-content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora cupiditate
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
        </div>
    )
}
