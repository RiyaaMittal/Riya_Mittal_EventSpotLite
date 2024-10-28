import React, { useEffect, useState } from 'react'
import axios from 'axios'
import eventsData from '../data/Assets.js';
import './Home.css';
import EventCard from './EventCard.js';
import Modal from './Modal.js';

const Home = () => {

  let [events,setEvents]=useState(eventsData);
  let [filteredevents,setFilteredEvents]=useState(events);
  let [errorr,setError]=useState(false);
  let [location,setlocation]=useState("not found");
  let [show,setshow]=useState(false);
  let [selectedEvent,setSelectedEvent]=useState();
  let [InputLocation,setInputLocation]=useState("");
  let [selectedEventName, setSelectedEventName] = useState("");
  
  const keyy=process.env.token;
  // Get unique names from events for dropdown
  const uniqueEventNames = [...new Set(events.flatMap(event => event.tags))];

  const fetchEvents = async () => {
    // try {
    //   const response = await axios.get('https://www.eventtribeapi.com/v3/users/me', {
    //     params: {
    //       // 'location.address': 'India',
    //       token: keyy,
    //       //  expand: 'venue',
    //       //  page_size: 10,
    //     },
    //   });
    //   setEvents(response.data.events);
    //   console.log(response.data.events);
      
    // } catch (error) {
    //   console.error("Error fetching events:", error);  
    // }
  };


  useEffect(() => {
    console.log(events);
    setFilteredEvents(events);
    // uniqueEventNames = [...new Set(events.flatMap(event => event.tags))];
    // Get user's location
    // navigator.geolocation.getCurrentPosition(
    //     async (position) => {
    //         const userLocation = await getUserLocation(position.coords.latitude, position.coords.longitude);
    //        // const filteredEvents = eventsData.filter(event => event.location.toLowerCase().includes(userLocation.toLowerCase()));
    //        // setEvents(filteredEvents);
    //        setlocation(userLocation);
    //        console.log(location);
    //     },
    //     (err) => {
    //         setError(true);
    //         console.error(err);
    //     }
    // );
}, []);

  // const getUserLocation = async (lat, long) => {
  //   const apiKey ='I2AC4KGVQF3F7MXTBWMM';
  //   const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${long}&key=${apiKey}`;

  //   try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       if (data.results.length > 0) {
  //           // Extracting the location from the response
  //           const location =data.results[0].components.state;
  //           return location || "Location not found";
  //       } else {
  //           throw new Error("Location not found");
  //       }
  //   } catch (error) {
  //       console.error("Error fetching location:", error);
  //       return 'Unknown Location'; 
  //   }
  // };

  const HandlecardClick=(event)=>{
    setSelectedEvent(event);
    setshow(true);
    console.log(event);
  }

  const handleStateInputChange = (e) => {
    const input = e.target.value;
    setInputLocation(input); 
  };

  const FilterbyState = (input) => {
    if (input.length>0) {
      const filtered = events.filter(event => 
        event.location.toLowerCase().includes(input.toLowerCase())
      );
      if(filtered.length>0){
        setFilteredEvents(filtered);
      }
      else{
        setFilteredEvents([]);
      }
    } else {
        setFilteredEvents(events); // Reset to all events if input is empty
    }
  };

  const handleNameChange = (e) => {
    setSelectedEventName(e.target.value);
  };

  const filterbyName = (name) => {
      setInputLocation("");
    // Filter events based on selected event name
      if (name) {
        const filtered = events.filter(event => 
          event.tags && event.tags.includes(name.toLowerCase())
        );
        if(filtered.length>0){
          setFilteredEvents(filtered);
        }
        else{
          setFilteredEvents([]);
        }
      } else {
         setFilteredEvents(events); // Reset if no name is selected
      }
  };


  return (
    <div className='home'>

      <div className='header'>
        <p>EventSpot Lite</p>
        <div className='explore-event-button'>Explore events</div>
      </div>

      <div className='top'>
        <div className='top-fields'>
            <div className='text1'>Search by name: </div>
            <div className='searching-fields'>
                <select value={selectedEventName} onChange={handleNameChange} className='dropdown'>
                    <option value="">Select an event</option>
                    {
                    uniqueEventNames.map((name, index) => (
                      <option key={index} value={name}>{name}</option>
                    ))
                    }
                </select>
                <button onClick={()=>filterbyName(selectedEventName)}>
                    <img src='https://img.icons8.com/ios7/600/search.png' />
                </button>
            </div>
        </div>

        <div className='top-fields'>
          <div className='text'>Search by location: </div>
          <div className='searching-fields'>
          <input type='text' placeholder='Enter state'
             value={InputLocation} onChange={handleStateInputChange}/>
          <button onClick={()=>FilterbyState(InputLocation)}>
            <img src='https://img.icons8.com/ios7/600/search.png' />
          </button>
          </div>
        </div>

      </div>
       
        {/* <div className='current-loc'>Your current location: {location}</div> */}
        <div className='current-loc'>Events </div>
        <div className='Events-container'>
          {
            filteredevents.length >0?
            filteredevents.map(event=>(
              <div className='events-card'  key={event.id} onClick={()=>HandlecardClick(event)}>
                <EventCard
                name={event.name} date={event.date} location={event.location}
                  description={event.description} duration={event.duration}   />
                </div>
            )):<div>No events found</div>
          }
            
        </div>  
        {show===true?
        <Modal selectedEvent={selectedEvent} setshow={setshow} />:<></>
        }
        {/* ...........end........   */}
    </div>
  )
}

export default Home