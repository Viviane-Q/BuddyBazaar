import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css" ;
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


const Map = ({ latitude, longitude }) => {
        /*return (
            <iframe
                style={styles.map}
                src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&q=${address}`}
                allowFullScreen={true}
            />
        )*/return (
            <MapContainer center={[longitude, latitude]} zoom={13} style={{ height: '300px', width: '100%' }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[longitude, latitude]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        )
};


export default Map;