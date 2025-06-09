import React, { useState } from 'react';

const ViewOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);

//   const fetchOrder = async () => {
//     try {
//       const res = await fetch(`http://localhost:8080/api/order/order/${orderId}`);
//       const data = await res.json();
//       if (res.ok) {
//         setOrder(data);
//       } else {
//         alert(data.message || "Failed to fetch order");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Error fetching order");
//     }
//   };

const fetchOrder = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/order/order/${orderId}`);
      
      if (!res.ok) {
        const errorText = await res.text(); // Get the response text for error details
        alert(`Error: ${errorText}`);
        return;
      }
  
      const data = await res.json(); // Parse JSON response
      setOrder(data);
    } catch (err) {
      console.error(err);
      alert("Error fetching order");
    }
  };
  

  return (
    <div className="p-4">
      <h2>View Order Status</h2>
      <input
        type="text"
        placeholder="Enter Order ID"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        className="form-control mb-3"
      />
      <button onClick={fetchOrder} className="btn btn-primary">Check Status</button>

      {order && (
        <div className="mt-4">
          <h4>Status: {order.orderStatus}</h4>
          <h5>Location: {order.orderLocation}</h5>
          <h6>Tracking Timeline:</h6>
          <ul>
            {order.trackingHistory.map((entry, index) => (
              <li key={index}>
                {entry.status} - {entry.location} - {new Date(entry.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ViewOrderPage;
