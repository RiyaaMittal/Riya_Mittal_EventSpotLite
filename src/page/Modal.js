import React from 'react'
import './Modal.css'

const Modal = ({selectedEvent,setshow}) => {
    const handleOutsideClick = (e) => {
        // Check if the clicked element is the modal-backdrop if yeas means we have to close the modal
        if (e.target.classList.contains('model-backdrop')) {     
          setshow(false);//so that it disappears0
        }
    };

    console.log(selectedEvent);


  return (
    <div className={`model-backdrop ${selectedEvent ? 'show' : ''}`} onClick={handleOutsideClick}>
    <div className='modal'>
        <div className='heading'>
          <div className='heading-name'>
              {selectedEvent.name}
          </div> 
          <div className='cross' onClick={()=>setshow(false)}>X</div>
        </div>
        
        <div className='desc'>
            <div>{selectedEvent.big_description}</div>
        </div>
        <div className='org info'>
            <div><span>Organizer:</span> <span className='textt'>{selectedEvent.organizer}</span></div>
        </div>
        <div className='dur info'>
             <div><span>Duration: </span> <span className='textt'> {selectedEvent.duration}</span></div>
        </div>
        <div className='pric info'>
             <div><span>Price: </span> <span className='textt'> {selectedEvent.ticket_price}</span></div>
        </div>
        <div className='contact info'>
             <div><span>Contact Info: </span><span className='textt'>{selectedEvent.contact_info}</span></div>
        </div>
    </div>
    </div>
  )
}

export default Modal