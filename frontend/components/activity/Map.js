import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import ActivityCard from './ActivityCard';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    // eslint-disable-next-line no-undef
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    // eslint-disable-next-line no-undef
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    // eslint-disable-next-line no-undef
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const Map = ({ activities, navigation }) => {
    return (
        <MapContainer center={[48.86666, 2.33333]} zoom={6} style={{ flex: 1, width: '100%', zIndex: 0 }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {activities.map((activity) => (
                <Marker key={activity.id} position={[activity.latitude, activity.longitude,]}>
                    <Popup>
                        <ActivityCard activity={activity} imageHeight={120}
                            width={300}
                            navigation={navigation} />
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    )
};


export default Map;