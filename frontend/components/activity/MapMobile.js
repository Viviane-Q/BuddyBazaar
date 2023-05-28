import React, { useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import ActivityCard from './ActivityCard';
const mapRef = React.createRef();

const MapPreviewMobile = ({ activities, goToActivityDetails }) => {
    useEffect(() => {
        if (activities.length > 0) {
            const latitudes = activities.map(activity => activity.latitude);
            const longitudes = activities.map(activity => activity.longitude);
            const minLatitude = Math.min(...latitudes);
            const maxLatitude = Math.max(...latitudes);
            const minLongitude = Math.min(...longitudes);
            const maxLongitude = Math.max(...longitudes);
            mapRef.current.fitToCoordinates([{ latitude: minLatitude, longitude: minLongitude }, { latitude: maxLatitude, longitude: maxLongitude }], {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, [activities]);
    return (
        <View style={{ flex: 1 }}>
            <MapView
                ref={mapRef}
                style={{ flex: 1, width: '100%', height: 300 }}
                initialRegion={{
                    latitude: 48.86666,
                    longitude: 2.33333,
                    latitudeDelta: 9,
                    longitudeDelta: 3,
                }}
                showsUserLocation={true}
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