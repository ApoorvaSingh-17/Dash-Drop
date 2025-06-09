import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import AdminNavbar from '../components/AdminNavbar';

// Fix default marker icon (Leaflet issue with Webpack)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});
const LocationPicker = ({ onLocationSelect }) => {
  useMapEvents({
    click(e) {
      onLocationSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null; // no visible marker
};

const UpdateLocationForm = () => {


  const stateCityData = {
    "Andhra Pradesh": ["Vijayawada", "Visakhapatnam", "Guntur", "Nellore", "Tirupati"],
    "Arunachal Pradesh": ["Itanagar", "Tawang", "Ziro", "Bomdila", "Roing"],
    "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Tezpur", "Jorhat"],
    "Bihar": ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur", "Darbhanga"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba", "Raigarh"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa", "Ponda"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar"],
    "Haryana": ["Chandigarh", "Faridabad", "Gurgaon", "Panipat", "Ambala"],
    "Himachal Pradesh": ["Shimla", "Dharamshala", "Manali", "Solan", "Mandi"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro", "Hazaribagh"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Alappuzha"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
    "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Ukhrul"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Baghmara", "Nongpoh"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip", "Kolasib"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur"],
    "Punjab": ["Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Ajmer", "Kota"],
    "Sikkim": ["Gangtok", "Namchi", "Gyalshing", "Mangan", "Rangpo"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
    "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Kailasahar", "Ambassa"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra", "Noida"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Haldwani", "Rishikesh"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri"],
    "Delhi": ["New Delhi", "Dwarka", "Rohini", "Saket", "Karol Bagh"]
  };




  const [form, setForm] = useState({
    orderId: '',
    status: '',
    event: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    date: '',
    time: ''
  });

  const [availableCities, setAvailableCities] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null); // { lat, lng }

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'state') {
      setAvailableCities(stateCityData[value] || []);
      setForm(prev => ({
        ...prev,
        state: value,
        city: '' // Reset city when state changes
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullLocation = `${form.address}, ${form.city}, ${form.state}, ${form.zip}`;

    try {
      const { data } = await axios.patch(
        `http://localhost:8080/api/order/update-status/${form.orderId}`,
        {
          status: form.status,
          event: form.event,
          location: fullLocation,
          lat: selectedLocation?.lat,
          lng: selectedLocation?.lng,
          date: form.date,
          time: form.time,
        }
      );
      alert("Order updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    }
  };

  // const fullAddress = `${form.address}, ${form.city}, ${form.state}, ${form.zip}`;
  // const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;


  return (
    <>
      <AdminNavbar />
      <div className='imageHomeUpdate centre'>
        <form className="row g-3 updateLocationPage" onSubmit={handleSubmit}>
          <div className="col-12">
            <label className="form-label">Order ID</label>
            <input type="text" name="orderId" className="form-control border-dark" onChange={handleChange} required />
          </div>

          <div className="col-12">
            <label className="form-label">Current Address</label>
            <input type="text" name="address" className="form-control border-dark" onChange={handleChange} />
          </div>

          <div className="col-md-4">
            <label className="form-label">State</label>
            <select name="state" className="form-select border-dark" onChange={handleChange} value={form.state}>
              <option value="">Choose...</option>
              {Object.keys(stateCityData).map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">City</label>
            <select
              name="city"
              className="form-select border-dark"
              onChange={handleChange}
              value={form.city}
              disabled={!form.state}
            >
              <option value="">Choose...</option>
              {availableCities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>


          <div className="col-md-2">
            <label className="form-label">Zip</label>
            <input type="text" name="zip" className="form-control border-dark" onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Date</label>
            <input type="date" name="date" className="form-control border-dark" onChange={handleChange} />
          </div>

          <div className="col-md-6">
            <label className="form-label">Time</label>
            <input type="time" name="time" className="form-control border-dark" onChange={handleChange} />
          </div>

          <div className="col-12">
            <label className="form-label">Order Status</label>
            <select name="status" className="form-select border-dark" onChange={handleChange} required>
              <option value="">Choose...</option>
              <option value="Placed">Placed</option>
              <option value="In-transit">In Transit</option>
              <option value="Processing">Processing</option>
              <option value="Assigned">Assigned</option>
              <option value="Out for delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="col-12">
            <label className="form-label">Event Description</label>
            <textarea
              name="event"
              className="form-control border-dark"
              rows="3"
              onChange={handleChange}
              required
            />
          </div>

          {/* Map Area */}
        <div className="mt-4">
          <h5>📍Optional: Drop Pin to Set Precise Location</h5>
          <MapContainer
            center={[22.5726, 88.3639]} // default center: Kolkata
            zoom={6}
            style={{ height: "400px", width: "100%", borderRadius: "8px", marginBottom: "20px" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />
            <LocationPicker onLocationSelect={setSelectedLocation} />
            {selectedLocation?.lat != null && selectedLocation?.lng != null && (
              <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
            )}

          </MapContainer>

          {selectedLocation && (
            <div>
              <strong>Selected Coordinates:</strong><br />
              Latitude: {selectedLocation.lat} <br />
              Longitude: {selectedLocation.lng}
            </div>
          )}
        </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary updatePageButton">Update</button>
          </div>
        </form>

        
      </div>

      {/* {form.address && form.city && form.state && (
        <div className="mt-4 ">
          <h5>Live Location Preview:</h5>
          <div style={{ border: "2px solid #333", borderRadius: "8px", overflow: "hidden" }}>
            <iframe
              title="Map Preview"
              src={mapUrl}
              width="400"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )} */}

    </>

  );
};

export default UpdateLocationForm;
