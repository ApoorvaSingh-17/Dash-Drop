import UserHomeNav from '../components/UserHomeNav';
import StaffHomeNav from '../components/StaffHomeNav';

import { useState, useEffect } from 'react';

const Home = () => {
    const [loginUser, setLoginUser] = useState(null);
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
        if(user) {
          console.log('Fetched User:', user);
          setLoginUser(user)
        }
      }, []);
      if (!loginUser) {
        return <p>Loading user data...</p>;
    }

  return (
    <>
      {loginUser.isStaff ? <StaffHomeNav /> : <UserHomeNav />}
      <div className='Home'>
        <div className="textHome">
         {loginUser && (
  <> 
    {/* Welcome message based on the user's role */}
    <span>
      Welcome, {loginUser.username} {loginUser.isStaff && '(Staff)'}
    </span>
    <div className="caption yellow" style={{ width: "70vw" }}>
      {loginUser.isStaff
        ? 'Update the location'
        : 'Book, track, and stay updated—your seamless courier journey starts here!'}
    </div>
  </>
)}
        </div>

      </div>
      <div className="services">
        <h1 className='centre services-title'>Our Services</h1>

        <div className="servicesList">
          <div className="card">
            <div className="card-img-top1"></div>
            <div className="card-body">
              <h5 className="card-title">Cost effective delivery</h5>
              <p className="card-text">We make special arrangements within our logistics network to ensure the cost effective delivery of consignments.</p>

            </div>
          </div>
          <div className="card">
            <div className="card-img-top2"></div>
            <div className="card-body">
              <h5 className="card-title">Secure Delivery</h5>
              <p className="card-text">Our team ensures that your consignments reaches the recipient with proper security measures taken.</p>

            </div>
          </div>
          <div className="card" >
            <div className="card-img-top3"></div>
            <div className="card-body">
              <h5 className="card-title">Express Delivery</h5>
              <p className="card-text">This service ensures that your urgent documents or packages reach the recipient at the earliest</p>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default Home