import React, {useState} from 'react'
import UserNavbar from '../components/UserLandNavbar'
import { useNavigate } from 'react-router-dom'; // Use for redirect
import { Link } from 'react-router-dom'
const Tracking_id= () => {

  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate(); // React Router v6 hook to redirect

  const handleTrackClick = () => {
    if (orderId) {
      navigate(`/tracking/${orderId}`);  // Redirect to tracking page with the orderId
    } else {
      alert("Please enter a valid Order ID");
    }
  };

  return (
    <>
      <UserNavbar />
      <div className='imageHome centre '>
        <div className="updateForm ">
          <h3 className='updateLocationHeader'>Track Live Location</h3>
          <label for="orderId" className='updateLabel'>Enter parcel-id for getting location.</label>
          <form action="" className='UpdateLocationForm'>
            <input type="text" placeholder='Parcel Id' name='orderId' className='updateInput' value={orderId} 
              onChange={(e) => setOrderId(e.target.value)}  />
            {/* <Link className="nav-link fs-4 text-dark" to="/tracking"> */}
            <button type="button" className="btn btn-success updateLocationButton" onClick={handleTrackClick}>Track</button>
            {/* </Link> */}
          </form>
        </div>

      </div>

    </>
  )
}

export default Tracking_id