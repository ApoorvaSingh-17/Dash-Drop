import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '/src/App.css'; // Importing your CSS file
import { FaMapMarkerAlt, FaWeightHanging, FaRupeeSign, FaUser } from 'react-icons/fa';

const PaymentPage = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { payload } = location.state || {};
  const [isLoading, setIsLoading] = useState(false);
  const [distance, setDistance] = useState(null); // State for the distance
  const [priceDetails, setPriceDetails] = useState({
    distanceFee: 0,
    weightFee: 0,
    taxAmount: 0,
    total: 0
  }); // State to store calculated price details

  useEffect(() => {
    if (!payload) {
      // No data → redirect back to booking form
      navigate('/booking');
      console.log(payload);
    }
  }, [payload, navigate]);

  // Function to fetch latitude and longitude using OpenCage API
  const getLatLng = async (address) => {
    try {
      const response = await axios.get('https://api.opencagedata.com/geocode/v1/json', {
        params: {
          q: `${address.senderAddress}, ${address.streetAddress}, ${address.city}, ${address.state}, ${address.postalCode}`,
          key: '8762e4c3711b4ddcac9b7e9bbb72db5d' // Replace with your OpenCage API Key
        }
      });
      return response.data.results[0].geometry;
    } catch (error) {
      console.error('Error fetching geocoding data:', error);
      return null;
    }
  };

  // Function to calculate the distance between two latitude and longitude points
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  useEffect(() => {
    const fetchDistance = async () => {
      if (payload) {
        const senderLocation = await getLatLng(payload.senderDetails.address);
        const receiverLocation = await getLatLng(payload.receiverDetails.address);

        if (senderLocation && receiverLocation) {
          const { lat: senderLat, lng: senderLng } = senderLocation;
          const { lat: receiverLat, lng: receiverLng } = receiverLocation;

          const calculatedDistance = calculateDistance(senderLat, senderLng, receiverLat, receiverLng);
          setDistance(calculatedDistance);

        }
      }
    };
    fetchDistance();
  }, [payload]);

  const calculatePrice = () => {

    const distanceCharge = 1;  // ₹ per km
    const weightCharge = 20;  // ₹ per kg
    const taxRate = 0.18;  // 18% GST
    const basePrice = 500;  // Fixed base price

    if (distance && payload.packageDetails.weight) {
      const distanceFee = distance * distanceCharge;
      const weightFee = payload.packageDetails.weight * weightCharge;
      const subtotal = basePrice + distanceFee + weightFee;
      const taxAmount = subtotal * taxRate;
      const total = subtotal + taxAmount;

      return {
        distanceFee,
        weightFee,
        taxAmount,
        total
      };
    } else {
      return {
        distanceFee: 0,
        weightFee: 0,
        taxAmount: 0,
        total: 0
      };
    }
  };

  useEffect(() => {
    if (distance && payload) {
      const price = calculatePrice();
      setPriceDetails(price);
    }
  }, [distance, payload]);


 const baseFee = 500;
  const { distanceFee, weightFee, taxAmount, total } = priceDetails;

  // const paymentDetails = {
  //     courierId: 'CTR123456',
  //     from: 'Kolkata, West Bengal',
  //     to: 'Mumbai, Maharashtra',
  //     weight: 2.5, // in kg
  //     distance: 2050, // in km
  //     basePrice: 500,
  //     distanceCharge: 1, // ₹ per km
  //     weightCharge: 20, // ₹ per kg
  //     taxRate: 0.18, // 18% GST
  //     receiver: {
  //         name: 'Riya Sharma',
  //         phone: '+91 98765 43210',
  //         address: '123, Bandra West, Mumbai',
  //     }
  // };

  const handlePayment = async () => {
    setIsLoading(true);

    let bookingId = null;

    try {
      // 1. Create the courier booking first (paymentStatus initially unpaid)
      const createBookingRes = await axios.post('http://localhost:8080/api/booking/create', {
        ...payload,
        packageDetails: {
         ...payload.packageDetails,
         baseFee: baseFee,
         distanceFee: distanceFee,
         weightFee: weightFee,
         taxAmount: taxAmount,
         
        },
        paymentDetails: {
          paymentStatus: 'pending', // initially unpaid
          paymentMethod: 'Razorpay', // ✅ Add this line
          amount: total.toFixed(2),
        }
      });

      console.log("✅ Booking ID from response:", createBookingRes.data.order._id);

      bookingId = createBookingRes.data.order._id; // assume backend returns booking _id
      localStorage.setItem("latestOrderId", bookingId);

      console.log("✅ Total (Rupees)", priceDetails.total)
      console.log("✅ Amount to pay (Paise):", Math.round(priceDetails.total * 100))

      // 2. Create a Razorpay Order from backend
      const paymentRes = await axios.post('http://localhost:8080/api/payment/create-order', {
        amount: Math.round(priceDetails.total * 100), // Amount to pay
        currency: 'INR',  // Currency code
      });

      const { id: razorpayOrderId, amount, currency } = paymentRes.data;

      // 3. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,  // Your Razorpay key here
        amount,
        currency,
        name: 'Courier Payment',
        description: 'Courier Booking Payment',
        order_id: razorpayOrderId,
        handler: async function (response) {
          try {
            // 4. Verify payment after success
            await axios.post('http://localhost:8080/api/payment/verify-payment', response);

            // const bookingId = localStorage.getItem("latestOrderId");

            // 5. Update booking with payment status = "paid"
            await axios.put(`http://localhost:8080/api/payment/update-payment/${bookingId}`, {
              paymentDetails: {
                paymentStatus: 'completed',
                paymentMethod: 'Razorpay',
                paymentId: response.razorpay_payment_id,
              }
            });

            alert('Payment Successful!');
            navigate('/order-success', {
              state: {
                orderId: bookingId,
                paymentMethod: 'Razorpay',
                
              },
            });
          } catch (error) {
            console.error('Payment verification failed:', error);

            // (Optional) Update booking to pending if verification fails
            await axios.put(`http://localhost:8080/api/payment/update-payment/${bookingId}`, {
              paymentDetails: {
                paymentStatus: 'pending',
              }
            });

            alert('Payment verification failed. Contact support.');
          }
        },
        prefill: {
          name: `${payload.senderDetails.firstName} ${payload.senderDetails.lastName}`,
          email: payload.senderDetails.email,
          contact: payload.senderDetails.contactNumber,
        },
        theme: { color: '#3399cc' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error('Error during payment process:', err);
      alert('Something went wrong.');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <div className="payment-page">
      <div className="card">
        <h1>Payment Details</h1>

        <section className="section">
          <h2>Courier Summary</h2>
          <div className="details">
            {/* <p><strong>Courier ID:</strong> {bookingId}</p> */}
            <p><FaMapMarkerAlt /> From: {payload?.senderDetails.address.city}</p>
            <p><FaMapMarkerAlt /> To: {payload?.receiverDetails.address.city}</p>
            <p><FaWeightHanging /> Weight: {payload?.packageDetails.weight} kg</p>
            <p><FaMapMarkerAlt /> Distance: {distance ? distance.toFixed(2) : 'Calculating...'} km</p>
          </div>
        </section>

        <section className="section">
          <h2>Price Breakdown</h2>
          <div className="price-details">
            <div className="row"><span>Base Price:</span><span>₹500</span></div>
            <div className="row"><span>Distance Fee:</span><span>₹{priceDetails.distanceFee.toFixed(2)}</span></div>
            <div className="row"><span>Weight Fee:</span><span>₹₹{priceDetails.weightFee.toFixed(2)}</span></div>
            <div className="row"><span>Taxes (18%):</span><span>₹{priceDetails.taxAmount.toFixed(2)}</span></div>
            <div className="row total"><span>Total Amount:</span><span>₹{priceDetails.total.toFixed(2)}</span></div>
          </div>
        </section>

        <section className="section">
          <h2>Receiver Information</h2>
          <div className="details">
            <p><FaUser /> {payload?.receiverDetails.firstName} {payload?.receiverDetails.lastName}</p>
            <p>📞 {payload?.receiverDetails.contactNumber}</p>
            <p>🏠 {payload?.receiverDetails.address.receiverAddress} {payload?.receiverDetails.address.streetAddress} {payload?.receiverDetails.address.landmark}  {payload?.receiverDetails.address.city} {payload?.receiverDetails.address.state} {payload?.receiverDetails.address.postalCode}</p>
          </div>
        </section>

        <div className="button-container">
          <button onClick={handlePayment} disabled={isLoading} className="pay-button">
            <FaRupeeSign /> {isLoading ? 'Processing...' : 'Proceed to Pay'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
