// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// // import { order } from '../data'
// import TrackItem from '../components/TrackItem'
// import UserNavbar from '../components/UserLandNavbar'
// // import Timeline from '../components/Timeline'
// const Tracking = () => {

//     const { orderId } = useParams();  // Get orderId from URL
//     const [order, setOrder] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchOrderTrackingData = async () => {
//           try {
//             const response = await fetch(`http://localhost:5000/api/orders/track/${orderId}`);
//             const data = await response.json();

//             if (response.ok) {
//               setOrder(data);
//             } else {
//               setError(data.message || "Failed to fetch order tracking data");
//             }
//           } catch (err) {
//             console.error(err);
//             setError("Error fetching order tracking data");
//           }
//         };

//         fetchOrderTrackingData();
//       }, [orderId]);

//     return (
//         <>
//             <UserNavbar />

//             {error && <div className="error-message">{error}</div>}

//             {order ? (
//                 <div className='imageHome'>

//                     <h3 className='tracking-title'>Events for parcel_id:{orderId}</h3>


//                     <table className="table table-bordered border-dark order-table ">
//                         <thead>
//                             <tr>
//                                 <th scope="col">Date </th>
//                                 <th scope="col">Time</th>
//                                 <th scope="col">Location</th>
//                                 <th scope="col">Event</th>

//                             </tr>
//                         </thead>
//                         {order.trackingHistory.map((event, index) => (

//                             <TrackItem
//                                 key={index}
//                                 date={event.date}
//                                 location={event.location}
//                                 event={event.event}
//                                 time={event.time}
//                             />
//                         ))
//                         }
//                     </table>

//                 </div>
//             ))}

//             {/* {order.map((orderItem) => (
//                 <div key={orderItem.id}>

//                     {orderItem.events.map((event, index) => (

//                         <Timeline
//                             key={index}
//                             date={event.date}
//                             location={event.location}

//                         />
//                     ))
//                     }
//                 </div>
//             ))} */}

//         </>
//     )
// }

// export default Tracking

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Use to get the orderId from the URL
import TrackItem from '../components/TrackItem';
import UserNavbar from '../components/UserLandNavbar';

const Tracking = () => {
  const { orderId } = useParams();  // Get orderId from URL
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderTrackingData = async () => {
      console.log("orderId from URL:", orderId);

      try {
        const response = await fetch(`http://localhost:8080/api/order/track/${orderId}`);
        const data = await response.json();

        if (response.ok) {
          setOrder(data);
        } else {
          setError(data.message || "Failed to fetch order tracking data");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching order tracking data");
      }
    };

    fetchOrderTrackingData();
  }, [orderId]);

  const handleSeeOnMap = () => {
    if (!order) return;

    const latestLocation = order.trackingHistory?.at(-1);

    if (!latestLocation?.lat || !latestLocation?.lng) {
    alert("Live location is not available yet.");
    return;
  }

    navigate('/track-map', {
      state: {
        source: {
          city: order.sourceCity,
          state: order.sourceState,
        },
        destination: {
          city: order.destCity,
          state: order.destState,
        },
        liveLocation: {
        lat: latestLocation.lat,
        lng: latestLocation.lng,
      },
      },
    });
  };

  return (
    <>
      <UserNavbar />

      {error && <div className="error-message">{error}</div>}

      {order ? (
        <div className='imageHome'>
          <h3 className='tracking-title'>Events for parcel_id: {orderId}</h3>
          <table className="table table-bordered border-dark order-table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Location</th>
                <th scope="col">Event</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {order.trackingHistory.map((event, index) => (
                <TrackItem
                  key={index}
                  date={new Date(event.timestamp).toLocaleDateString()}
                  location={event.location}
                  event={event.event}
                  time={new Date(event.timestamp).toLocaleTimeString()}
                  status={event.status}
                />
              ))}
            </tbody>
          </table>
          {/* See on Map Button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              className="btn btn-primary"
              onClick={handleSeeOnMap}
              disabled={!order.trackingHistory?.length}
            >
              See on Map
            </button>
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Tracking;
