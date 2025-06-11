import React from 'react';
import { useLocation } from 'react-router-dom';
import TrackingMap from '../components/TrackingMap';
import UserNavbar from '../components/UserHomeNav';

const TrackMapPage = () => {
  const location = useLocation();
  const stateData = location.state || {};
  const { source, destination, liveLocation } = stateData;

  // Check if essential data is missing
  const isDataMissing =
    !source?.city ||
    !source?.state ||
    !destination?.city ||
    !destination?.state ||
    !liveLocation?.lat ||
    !liveLocation?.lng;

  if (isDataMissing) {
    return (
      <div>
        <UserNavbar />
        <div className="container mt-5 text-center">
          <h4 className="text-danger">❗Missing or invalid tracking data.</h4>
          <p>Please go back and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <UserNavbar />
      <div className="container mt-4">
        <h3 className="mb-3">Live Courier Tracking Map</h3>
        <TrackingMap
          source={source}
          destination={destination}
          liveLocation={liveLocation}
        />
      </div>
    </div>
  );
};

export default TrackMapPage;
