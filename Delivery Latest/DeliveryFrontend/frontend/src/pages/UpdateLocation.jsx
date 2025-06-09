import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import { Link } from 'react-router-dom'
const UpdateLocation = () => {
  return (
    <>
      <AdminNavbar />
      <div className='imageHome centre '>
        <div className="updateForm ">
          <h3 className='updateLocationHeader'>Update Location</h3>
          <label for="orderId" className='updateLabel'>Enter parcel-id for updating location.</label>
          <form action="" className='UpdateLocationForm'>
            <input type="text" placeholder='Parcel Id' name='orderId' className='updateInput' />
            <Link className="fs-4 text-dark" to="/updateForm">
            <button type="button" className="btn btn-success updateLocationButton" to>Update</button>
            </Link>
            
          </form>
        </div>

      </div>

    </>
  )
}

export default UpdateLocation