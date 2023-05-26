import React from 'react';
import { View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const YOUR_LATITUDE_DELTA = 0.0922;
const YOUR_LONGITUDE_DELTA = 0.0421;

const MapPreviewMobile = ({ latitude, longitude }) => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1, width: '100%', height: 300 }}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: YOUR_LATITUDE_DELTA,
                    longitudeDelta: YOUR_LONGITUDE_DELTA,
                }}
                provider={PROVIDER_GOOGLE}
            >
                <Marker
                    coordinate={{ latitude: latitude, longitude: longitude }}
                />
            </MapView>
        </View>

    )
};

export default MapPreviewMobile;