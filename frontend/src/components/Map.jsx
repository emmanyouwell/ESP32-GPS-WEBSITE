import React, { useState, useEffect, useRef } from 'react'
import { Circle, MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import '../assets/css/style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import osm from './osm-providers'
import iconMarker from '../assets/images/marker.png'
import PropTypes from 'prop-types'
const markerIcon = new L.Icon({
    iconUrl: iconMarker,
    iconSize: [60, 70],
    iconAnchor: [27, 70],
    popupAnchor: [3, -46]
})
const ZOOM_LEVEL = 20;

const MapUpdater = ({ location }) => {
    const map = useMap();

    useEffect(() => {
        if (location.latitude && location.longitude) {
            map.setView([location.latitude, location.longitude], ZOOM_LEVEL);
        }
    }, [location, map]);

    return null; // This component doesn't render anything
};
const AdjustedCircle = ({ location }) => {
    const map = useMap();

    // Convert pixel offset to latitude/longitude
    const offsetPoint = map.containerPointToLatLng(
        map.latLngToContainerPoint([location.latitude, location.longitude]).add([0, -20])
    );

    return (
        <Circle
            center={offsetPoint}
            pathOptions={{ color: 'red' }}
            radius={100}
        />
    );
};
const MapComponent = ({ location }) => {
    const [center, setCenter] = useState({ lat: location.latitude, lng: location.longitude })
   
    const mapRef = useRef()
    useEffect(() => {
        if (location.latitude && location.longitude) {
            setCenter({ lat: location.latitude, lng: location.longitude })
            // mapRef.current.leafletElement.setView([location.latitude, location.longitude], ZOOM_LEVEL)
        }
    }, [location])
    return (
        <div>

            <MapContainer
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
                className="leaflet-container"
            >
                <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
                {/* Component to update the center dynamically */}
                <MapUpdater location={location} />
                <Marker position={[location.latitude, location.longitude]} icon={markerIcon}>
                    <Popup><b>Home</b></Popup>
                    <AdjustedCircle location={location} />
                </Marker>
            </MapContainer>
        </div>
    )
}

MapUpdater.propTypes = {
    location: PropTypes.object
}
AdjustedCircle.propTypes = {
    location: PropTypes.object
}
MapComponent.propTypes = {
    location: PropTypes.object
}
export default MapComponent