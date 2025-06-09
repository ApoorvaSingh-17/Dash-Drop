
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import UserNavbar from '../components/UserLandNavbar'
import axios from "axios"
import { message } from 'antd'; // Ant Design for notifications
import { Navigate, useNavigate } from 'react-router-dom';


const CourierForm = () => {
 

const navigate = useNavigate();

 const [formData, setFormData] = useState({
 userId: '', // Populate this dynamically based on the logged-in user
 senderDetails: {
 firstName: '',
 lastName:'',
 email: '',
 contactNumber: '',
 address: {
 senderAddress: '',
 streetAddress: '',
 landmark: '',
 city: '',
 state: '',
 postalCode: '',
 },
 },
 receiverDetails: {
 firstName: '',
 lastName:'',
 email: '',
 contactNumber: '',
 address: {
 receiverAddress: '',
 streetAddress: '',
 landmark: '',
 city: '',
 state: '',
 postalCode: '',
 },
 },
 packageDetails: {
 weight: '',
 description: '',
 courierType: 'standard', // Default value
 pickupDate: '',
 estimatedDeliveryDate: '',
 },
 paymentDetails: {
 paymentMethod: 'Cash On Delivery', // Default value
 paymentStatus: 'pending', // Default value
 },
 orderLocation: 'Pickup location', // Default value
 orderStatus: 'placed', // Default value
 });
 
 
 const handleChange = (e) => {
 const { name, value } = e.target;
 
 // Split the "name" property to manage nested data structures
 const nameParts = name.split('.');
 
 setFormData((prev) => {
 if (nameParts.length === 1) {
 // Handle top-level fields
 return {
 ...prev,
 [name]: value,
 };
 } else if (nameParts.length === 2) {
 // Handle nested fields
 return {
 ...prev,
 [nameParts[0]]: {
 ...prev[nameParts[0]],
 [nameParts[1]]: value,
 },
 };
 } else if (nameParts.length === 3) {
 // Handle deeply nested fields
 return {
 ...prev,
 [nameParts[0]]: {
 ...prev[nameParts[0]],
 [nameParts[1]]: {
 ...prev[nameParts[0]][nameParts[1]],
 [nameParts[2]]: value,
 },
 },
 };
 }
 });
 };
 


 const handleSubmit = async (e) => {
 e.preventDefault();
 
 try {
 const userId = JSON.parse(localStorage.getItem('user')); // Retrieve the user ID from LocalStorage
 
 if (!userId) {
 throw new Error('User ID not found in LocalStorage');
 }
 
 const payload = {
 userId:userId.id, // Add the user ID to the payload
 senderDetails: {
 firstName: formData.senderDetails.firstName,
 lastName:formData.senderDetails.lastName,
 email: formData.senderDetails.email,
 contactNumber: formData.senderDetails.contactNumber,
 address: {
 senderAddress: formData.senderDetails.address.senderAddress,
 streetAddress: formData.senderDetails.address.streetAddress,
 landmark: formData.senderDetails.address.landmark,
 city: formData.senderDetails.address.city,
 state: formData.senderDetails.address.state,
 postalCode: formData.senderDetails.address.postalCode,
 },
 },
 receiverDetails: {
 firstName: formData.receiverDetails.firstName,
 lastName:formData.receiverDetails.lastName,
 email: formData.receiverDetails.email,
 contactNumber: formData.receiverDetails.contactNumber,
 address: {
 receiverAddress: formData.receiverDetails.address.senderAddress,
 streetAddress: formData.receiverDetails.address.streetAddress,
 landmark: formData.receiverDetails.address.landmark,
 city: formData.receiverDetails.address.city,
 state: formData.receiverDetails.address.state,
 postalCode: formData.receiverDetails.address.postalCode,
 },
 },
 packageDetails: {
 weight: formData.packageDetails.weight,
 description: formData.packageDetails.description,
 courierType: formData.packageDetails.courierType,
 pickupDate: formData.packageDetails.pickupDate,
 estimatedDeliveryDate: formData.packageDetails.estimatedDeliveryDate,
 },
 paymentDetails: {
 paymentMethod: formData.paymentDetails.paymentMethod,
 paymentStatus: 'pending', // Default payment status
 },
 };

  // Navigate to Payment Page with payload (no DB save yet)
  navigate('/payment', { state: { payload } });
 
//  const response = await axios.post(
//  'http://localhost:8080/api/booking/create', // Replace with your actual endpoint
//  payload
//  );
 
//  if (response.status === 200 || response.status === 201) {
//  alert('Order placed successfully!');
//  console.log('Response:', response.data);
//  } else {
//  alert('Failed to place the order. Please try again.');
//  console.error('Error:', response.data);
//  }

 } catch (error) {
 alert('An error occurred while placing the order.');
 console.log(error)
 console.error('Error:', error.message);
 }
 };
 

 return (
 
 <div className='form-page '> 
 <UserNavbar/>
 <div className="form-container " >
 <h2>PLACE YOUR COURIER ORDER</h2>
 <form onSubmit={handleSubmit}>
 <div className="form-section">
 <h3>SENDER INFORMATION</h3>
 <div className='form-row'> 
 <div className="form-group">
 <label htmlFor="senderName">First Name</label>
 <input
 type="text"
 id="senderName"
 name="senderDetails.firstName"
 value={formData.senderDetails.firstName}
 onChange={handleChange}
 placeholder="Enter first name"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="senderName">Last Name</label>
 <input
 type="text"
 id="senderName"
 name="senderDetails.lastName"
 value={formData.senderDetails.lastName}
 onChange={handleChange}
 placeholder="Enter last name"
 required
 />
 </div>
 </div>
 <div className='form-row'>
 <div className="form-group">
 <label htmlFor="sendermail">E-mail</label>
 <input
 type="text"
 id="sendermail"
 name="senderDetails.email"
 value={formData.senderDetails.email}
 onChange={handleChange}
 placeholder="Enter E-mail"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="senderContact">Contact Number</label>
 <input
 type="text"
 id="senderContact"
 name="senderDetails.contactNumber"
 value={formData.senderDetails.contactNumber}
 onChange={handleChange}
 placeholder="Enter Contact Number"
 required
 />
 </div>
 </div>
 <div className="form-group">
 <label htmlFor="senderAddress">Address</label>
 <input
 type='text'
 id="senderAddress"
 name="senderDetails.address.senderAddress"
 value={formData.senderDetails.address.senderAddress}
 onChange={handleChange}
 placeholder="House No./Building Name"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="senderStreetAddress">Street/Area</label>
 <input
 type='text'
 id="senderStreetAddress"
 name="senderDetails.address.streetAddress"
 value={formData.senderDetails.address.streetAddress}
 onChange={handleChange}
 placeholder="Street/Area"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="senderLandmarkAddress">Landmark</label>
 <input
 type='text'
 id="senderLandmarkAddress"
 name="senderDetails.address.landmark"
 value={formData.senderDetails.address.landmark}
 onChange={handleChange}
 placeholder="Landmark"
 required
 />
 </div>
 <div className="form-row">
 <div className="form-group">
 <label htmlFor="senderCity">City</label>
 <input
 type="text"
 id="senderCity"
 name="senderDetails.address.city"
 value={formData.senderDetails.address.city}
 onChange={handleChange}
 placeholder="City"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="senderState">State</label>
 <input
 type="text"
 id="senderState"
 name="senderDetails.address.state"
 value={formData.senderDetails.address.state}
 onChange={handleChange}
 placeholder="State"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="senderPostalCode">Postal Code</label>
 <input
 type="text"
 id="senderPostalCode"
 name="senderDetails.address.postalCode"
 value={formData.senderDetails.address.postalCode}
 onChange={handleChange}
 placeholder="Postal Code"
 required
 />
 </div>
 </div>
 </div>







 <div className="form-section">
 <h3>RECEIVER INFORMATION</h3>
 <div className='form-row'>
 <div className="form-group">
 <label htmlFor="receiverFName">First Name</label>
 <input
 type="text"
 id="receiverFName"
 name="receiverDetails.firstName"
 value={formData.receiverDetails.firstName}
 onChange={handleChange}
 placeholder="Enter First Name"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="receiverLName">Last Name</label>
 <input
 type="text"
 id="receiverLName"
 name="receiverDetails.lastName"
 value={formData.receiverDetails.lastName}
 onChange={handleChange}
 placeholder="Enter Last name"
 required
 />
 </div>
 </div>
 <div className='form-row'>
 <div className="form-group">
 <label htmlFor="recievermail">E-mail</label>
 <input
 type="text"
 id="recievermail"
 name="receiverDetails.email"
 value={formData.receiverDetails.email}
 onChange={handleChange}
 placeholder="Enter E-mail"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="recieverContact">Contact Number</label>
 <input
 type="text"
 id="recieverContact"
 name="receiverDetails.contactNumber"
 value={formData.receiverDetails.contactNumber}
 onChange={handleChange}
 placeholder="Enter Contact Number"
 required
 />
 </div>
 </div>
 
 <div className="form-group">
 <label htmlFor="receiverAddress">Address</label>
 <input
 type='text'
 id="receiverAddress"
 name="receiverDetails.address.senderAddress"
 value={formData.receiverDetails.address.senderAddress}
 onChange={handleChange}
 placeholder="House No./Building Name"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="receiverStreetAddress">Street/Area</label>
 <input
 type='text'
 id="receiverStreetAddress"
 name="receiverDetails.address.streetAddress"
 value={formData.receiverDetails.address.streetAddress}
 onChange={handleChange}
 placeholder="Street/Area"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="receiverLandmarkAddress">Landmark</label>
 <input
 type='text'
 id="receiverLandmarkAddress"
 name="receiverDetails.address.landmark"
 value={formData.receiverDetails.address.landmark}
 onChange={handleChange}
 placeholder="Landmark"
 required
 />
 </div>
 <div className="form-row">
 <div className="form-group">
 <label htmlFor="receiverCity">City</label>
 <input
 type="text"
 id="receiverCity"
 name="receiverDetails.address.city"
 value={formData.receiverDetails.address.city}
 onChange={handleChange}
 placeholder="City"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="recieverState">State</label>
 <input
 type="text"
 id="recieverState"
 name="receiverDetails.address.state"
 value={formData.receiverDetails.address.state}
 onChange={handleChange}
 placeholder="State"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="receiverPostalCode">Postal Code</label>
 <input
 type="text"
 id="receiverPostalCode"
 name="receiverDetails.address.postalCode"
 value={formData.receiverDetails.address.postalCode}
 onChange={handleChange}
 placeholder="Postal Code"
 required
 />
 </div>
 </div>
 </div>

 <div className="form-section">
 <h3>PACKAGE DETAILS</h3>
 <div className="form-group">
 <label htmlFor="weight">Package Weight (kg)</label>
 <input
 type="number"
 id="weight"
 name="packageDetails.weight"
 value={formData.packageDetails.weight}
 onChange={handleChange}
 placeholder="Weight in kg"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="desc">Package Description</label>
 <textarea
 id="desc"
 name="packageDetails.description"
 value={formData.packageDetails.description}
 onChange={handleChange}
 placeholder="Description"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="courierType">Courier Type</label>
 <select
 id="courierType"
 name="packageDetails.courierType"
 value={formData.packageDetails.courierType}
 onChange={handleChange}
 required
 >
 <option value="standard">Standard</option>
 <option value="express">Express</option>
 <option value="same-day">Same Day</option>
 </select>
 </div>

 <div className="form-group">
 <label htmlFor="desc">Pickup Date</label>
 <input
 type='date'
 id="desc"
 name="packageDetails.pickupDate"
 value={formData.packageDetails.pickupDate}
 onChange={handleChange}
 placeholder="Pickup Date"
 required
 />
 </div>
 <div className="form-group">
 <label htmlFor="desc">Estimated Delivery Date</label>
 <input
 type='date'
 id="desc"
 name="packageDetails.estimatedDeliveryDate"
 value={formData.packageDetails.estimatedDeliveryDate}
 onChange={handleChange}
 placeholder="Delivery Date"
 required
 />
 </div>
 </div>

 <div className="form-section">
 <h3>PAYMENT METHODS</h3>
 <FormControl>
 <FormLabel id="demo-radio-buttons-group-label">CHOOSE YOUR PAYMENT OPTION</FormLabel>
 <RadioGroup
 aria-labelledby="demo-radio-buttons-group-label"
 defaultValue="cash on delivery"
 name="paymentDetails.paymentMethod"
 >
 <FormControlLabel value="Razorpay" control={<Radio />} label= "Razorpay" />
 <FormControlLabel value="Cash on Delivery" control={<Radio />} label="Cash on Delivery" />
 </RadioGroup>
 </FormControl>
 

 </div>
 <button type="submit" className="btn-submit">PLACE ORDER</button>
 </form>
 </div>
 </div>
 );
};

export default CourierForm;