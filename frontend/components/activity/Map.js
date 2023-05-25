import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
const GOOGLE_KEY = Constants.expoConfig.extra.googleKey;
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css" ;
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const YOUR_LATITUDE_DELTA = 0.0922; // The desired latitude span (adjust as needed)
const YOUR_LONGITUDE_DELTA = 0.0421; // The desired longitude span (adjust as needed)


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

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 300,
        border: 'none'
    },
});

export default Map;