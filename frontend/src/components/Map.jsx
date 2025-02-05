import React, {useState, useEffect, useRef} from 'react'
import {MapContainer, Marker, Popup, TileLayer} from 'react-leaflet'
import '../assets/css/style.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import osm from './osm-providers'
import iconMarker from '../assets/images/marker.png'
const markerIcon = new L.Icon({
    iconUrl: iconMarker,
    iconSize: [60,70],
    iconAnchor: [27,70],
    popupAnchor: [3, -46]
})
const MapComponent = () => {
    const [center, setCenter] = useState({lat: 14.510687 , lng: 121.059635})
    const ZOOM_LEVEL=20;
    const mapRef = useRef()
  return (
    <div>
        <MapContainer
            center={center}
            zoom={ZOOM_LEVEL}
            ref={mapRef}
            className="leaflet-container"
        >
            <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution}/>

            <Marker position={[14.510687, 121.059635]} icon={markerIcon}>
                <Popup><b>Home</b></Popup>
            </Marker>
        </MapContainer>
    </div>
  )
}

export default MapComponent