import React from 'react';
import { View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ActivityCard from './ActivityCard';
const YOUR_LATITUDE_DELTA = 0.0922;
const YOUR_LONGITUDE_DELTA = 0.0421;

const MapPreviewMobile = ({ activities, goToActivityDetails }) => {
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1, width: '100%', height: 300 }}
                initialRegion={{
                    latitude: 48.86666,
                    longitude: 2.33333,
                    latitudeDelta: YOUR_LATITUDE_DELTA,
                    longitudeDelta: YOUR_LONGITUDE_DELTA,
                }}
                provider={PROVIDER_GOOGLE}
            >
                {activities
                    .filter(activity => activity.latitude && activity.longitude)
                    .map((activity) => (
                        <Marker key={activity.id} coordinate={{ latitude: activity.latitude, longitude: activity.longitude }}>
                            <Callout onPress={() => { goToActivityDetails(activity) }}>
                                <ActivityCard activity={activity} imageHeight={50}
                                    width={300}
                                />
                            </Callout>
                        </Marker>
                    ))}
            </MapView>
        </View>

    )
};

export default MapPreviewMobile;