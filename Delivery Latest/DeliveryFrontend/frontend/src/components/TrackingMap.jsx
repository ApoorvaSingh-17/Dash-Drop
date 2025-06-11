import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getDistance } from 'geolib';
import L from 'leaflet';

// Custom colored icons
const redIcon = new L.Icon({
    iconUrl: '/markers/marker-icon-red.png',
    shadowUrl: '/markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const greenIcon = new L.Icon({
    iconUrl: '/markers/marker-icon-green.png',
    shadowUrl: '/markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const blueIcon = new L.Icon({
    iconUrl: '/markers/marker-icon-blue.png',
    shadowUrl: '/markers/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Fix Leaflet's default icon bug
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

// Reusable component to adjust map view
const FitBounds = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds && bounds.length >= 2) {
            map.fitBounds(bounds);
        }
    }, [bounds, map]);
    return null;
};

const TrackingMap = ({ source, destination, liveLocation }) => {
    const [sourceCoords, setSourceCoords] = useState(null);
    const [destinationCoords, setDestinationCoords] = useState(null);
    const [bounds, setBounds] = useState([]);

    const OPENCAGE_API_KEY = "8762e4c3711b4ddcac9b7e9bbb72db5d";

    const geocodeLocation = async (city, state) => {
        const query = `${city}, ${state}, India`;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${OPENCAGE_API_KEY}`;

        try {
            const res = await axios.get(url);
            if (res.data.results && res.data.results.length > 0) {
                const { lat, lng } = res.data.results[0].geometry;
                return { lat, lng };
            } else {
                console.warn('No geocoding result for:', query);
                return null;
            }
        } catch (err) {
            console.error('Geocoding error for', query, err);
            return null;
        }
    };

    useEffect(() => {
        const fetchCoordinates = async () => {
            const src = await geocodeLocation(source.city, source.state);
            const dest = await geocodeLocation(destination.city, destination.state);

            setSourceCoords(src);
            setDestinationCoords(dest);

            const b = [];
            if (src) b.push([src.lat, src.lng]);
            if (dest) b.push([dest.lat, dest.lng]);
            if (liveLocation?.lat && liveLocation?.lng) b.push([liveLocation.lat, liveLocation.lng]);

            setBounds(b);
        };

        fetchCoordinates();
    }, [source, destination, liveLocation]);

    useEffect(() => {
        console.log("Source Coords:", sourceCoords);
        console.log("Destination Coords:", destinationCoords);
        console.log("Live Location:", liveLocation);
    }, [sourceCoords, destinationCoords, liveLocation]);

    const [coveredDistance, setCoveredDistance] = useState(null);
    const [remainingDistance, setRemainingDistance] = useState(null);
    const [eta, setEta] = useState(null);

    // useEffect(() => {
    //     if (
    //         sourceCoords?.lat &&
    //         sourceCoords?.lng &&
    //         destinationCoords?.lat &&
    //         destinationCoords?.lng &&
    //         liveLocation?.lat &&
    //         liveLocation?.lng
    //     ) {
    //         const covered = getDistance(
    //             { latitude: sourceCoords.lat, longitude: sourceCoords.lng },
    //             { latitude: liveLocation.lat, longitude: liveLocation.lng }
    //         );

    //         const remaining = getDistance(
    //             { latitude: liveLocation.lat, longitude: liveLocation.lng },
    //             { latitude: destinationCoords.lat, longitude: destinationCoords.lng }
    //         );

    //         const estimatedTime = Math.round((remaining / 40000) * 60); // assuming 40km/h average speed

    //         setCoveredDistance(covered);
    //         setRemainingDistance(remaining);
    //         setEta(estimatedTime);
    //     }
    // }, [sourceCoords, destinationCoords, liveLocation]);

    useEffect(() => {
        console.log("Running useEffect for ETA calculation...");
        console.log({ sourceCoords, destinationCoords, liveLocation });

        if (
            sourceCoords?.lat &&
            sourceCoords?.lng &&
            destinationCoords?.lat &&
            destinationCoords?.lng &&
            liveLocation?.lat &&
            liveLocation?.lng
        ) {
            const covered = getDistance(
                { latitude: sourceCoords.lat, longitude: sourceCoords.lng },
                { latitude: liveLocation.lat, longitude: liveLocation.lng }
            );

            const remaining = getDistance(
                { latitude: liveLocation.lat, longitude: liveLocation.lng },
                { latitude: destinationCoords.lat, longitude: destinationCoords.lng }
            );

            const estimatedTime = Math.round((remaining / 40000) * 60); // 40km/hr avg

            console.log("✔ Distance calculated");
            setCoveredDistance(covered);
            setRemainingDistance(remaining);
            setEta(estimatedTime);
        } else {
            console.warn("❌ Coordinates not ready, skipping calculation.");
        }
    }, [sourceCoords, destinationCoords, liveLocation]);




    return (
        <div style={{ height: "500px", width: "100%", minHeight: "500px", borderRadius: "8px", marginTop: "20px" }}>

            <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: "100%", width: "100%" }} whenReady={(map) => {
                setTimeout(() => {
                    map.target.invalidateSize();
                }, 100); // fixes hidden map
            }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />

                {sourceCoords && (
                    <Marker position={[sourceCoords.lat, sourceCoords.lng]} icon={blueIcon}>
                        <Popup>📦 Source: {source.city}, {source.state}</Popup>
                    </Marker>
                )}

                {destinationCoords && (
                    <Marker position={[destinationCoords.lat, destinationCoords.lng]} icon={greenIcon}>
                        <Popup>🏁 Destination: {destination.city}, {destination.state}</Popup>
                    </Marker>
                )}

                {liveLocation?.lat && liveLocation?.lng && (
                    <Marker position={[liveLocation.lat, liveLocation.lng]} icon={redIcon}>
                        <Popup>🚚 Current Location</Popup>
                    </Marker>
                )}

                <FitBounds bounds={bounds} />
                {/* {sourceCoords && destinationCoords && liveLocation && (
                    <Polyline
                        positions={[
                            [sourceCoords.lat, sourceCoords.lng],
                            [liveLocation.lat, liveLocation.lng],
                            [destinationCoords.lat, destinationCoords.lng],
                        ]}
                        pathOptions={{ color: 'blue', weight: 2, dashArray: '4 6' }}
                    />
                )} */}

                {/* Green Line: Source to Live Location */}
                {sourceCoords && liveLocation && (
                    <Polyline
                        positions={[
                            [sourceCoords.lat, sourceCoords.lng],
                            [liveLocation.lat, liveLocation.lng],
                        ]}
                        pathOptions={{ color: 'blue', weight: 2 }}
                    />
                )}

                {/* Red Line: Live Location to Destination */}
                {liveLocation && destinationCoords && (
                    <Polyline
                        positions={[
                            [liveLocation.lat, liveLocation.lng],
                            [destinationCoords.lat, destinationCoords.lng],
                        ]}
                        pathOptions={{ color: 'red', weight: 2, dashArray: '5 5' }}
                    />
                )}

            </MapContainer>

            {/* {coveredDistance !== null && remainingDistance !== null && eta !== null ? (
                <div className="eta-summary">
                    <p><strong>📍 Covered:</strong> {(coveredDistance / 1000).toFixed(2)} km</p>
                    <p><strong>🚩 Remaining:</strong> {(remainingDistance / 1000).toFixed(2)} km</p>
                    <p><strong>⏳ ETA:</strong> {eta} mins</p>
                    <p className='eta-clarity'>"📌ETA is estimated based on straight-line distance and may vary"</p>
                </div>
            ) : (
                <p className="eta-loading">Calculating ETA...</p>
            )} */}

            {coveredDistance !== null && remainingDistance !== null && eta !== null ? (
                <div className="tracking-card mt-4">
                    <div className="card-header d-flex align-items-center gap-2">
                        <span role="img" aria-label="truck" style={{ fontSize: "1.5rem" }}>🚚</span>
                        <h5 className="mb-0">Courier Travel Summary</h5>
                    </div>
                    <div className="card-body">
                        <div className="progress mb-3" style={{ height: '20px' }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{
                                    width: `${(coveredDistance / (coveredDistance + remainingDistance)) * 100}%`,
                                    backgroundColor: '#28a745',
                                }}
                                aria-valuenow={(coveredDistance / (coveredDistance + remainingDistance)) * 100}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {(coveredDistance / (coveredDistance + remainingDistance) * 100).toFixed(0)}%
                            </div>
                        </div>

                        <p>
                            <strong>📍 Covered Distance:</strong>{" "}
                            <span className="text-success">
                                {(coveredDistance / 1000).toFixed(2)} km
                            </span>
                        </p>
                        <p>
                            <strong>🚩 Remaining Distance:</strong>{" "}
                            <span className="text-danger">
                                {(remainingDistance / 1000).toFixed(2)} km
                            </span>
                        </p>
                        <p>
                            <strong>⏳ ETA(Estimated Time of Arrival):</strong> {eta} mins
                        </p>
                        <p className='eta-clarity'>"📌ETA is estimated based on straight-line distance and may vary"</p>
                    </div>
                </div>
            ) : (
                <p className="text-center text-muted mt-3">Calculating ETA...</p>
            )}



        </div>
    );
};

export default TrackingMap;
