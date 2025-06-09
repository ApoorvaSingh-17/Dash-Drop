import React from 'react'

const TrackItem = ({ date, time, location, event, status }) => {
  return (
    <>
    
    
    <tr>
      <td className="trackItem">{date}</td>
      <td className="trackItem">{time}</td>
      <td className="trackItem">{location}</td>
      <td className="trackItem">{event}</td>
      <td className="trackItem">{status}</td>
      
    </tr>
    
  
    </>
  )
}

export default TrackItem