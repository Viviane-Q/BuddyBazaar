import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    // eslint-disable-next-line no-undef
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    // eslint-disable-next-line no-undef
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    // eslint-disable-next-line no-undef
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const MapPreview = ({ latitude, longitude }) => {
    return (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '300px', width: '100%' }} key={new Date().getTime()}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
            </Marker>
        </MapContainer>
    )
};


export default MapPreview;