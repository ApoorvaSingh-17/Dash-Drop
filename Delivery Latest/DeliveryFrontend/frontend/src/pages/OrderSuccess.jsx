import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import '/src/App.css';

const OrderSuccess = () => {
  const location = useLocation();
  const { orderId, paymentMethod, estimatedDeliveryDate } = location.state || {};

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="success-icon">✅</div>
        <h2 className="success-title">Payment Successful!</h2>
        <p className="success-message">Your courier booking has been placed successfully.</p>

        <div className="success-details">
          <p><strong>Order ID:</strong> {orderId}</p>
          <p><strong>Estimated Delivery:</strong> {new Date(estimatedDeliveryDate).toDateString()}</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
        </div>

        <Link to="/tracking-id" className="success-button">Track Your Order</Link>
        <Link to="/" className="success-home">← Return to Home</Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
