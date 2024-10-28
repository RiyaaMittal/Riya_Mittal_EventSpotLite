import React from 'react'
import './EventCard.css';

const EventCard = ({name,date,location,description,duration}) => {
  return (
    <div className='container'>
        <div className='name'>
            {name}
        </div>
        <div className='date-location'>
            <p>{date}</p>
            <p>{location}</p>
        </div>
        <div>{description}</div>
        <div className='dura'>Durration: {duration}</div>
        <p className='footer'>Click to know more..</p>
    </div>
  )
}

export default EventCard