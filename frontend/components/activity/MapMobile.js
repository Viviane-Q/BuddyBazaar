import React from 'react';
import { View } from 'react-native';
import MapView , { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const YOUR_LATITUDE_DELTA = 0.0922; // The desired latitude span (adjust as needed)
const YOUR_LONGITUDE_DELTA = 0.0421; // The desired longitude span (adjust as needed)


const MapMobile = () => {
        const latitude = 37.78825;
        const longitude = -122.4324;
        return (
            <View style={{ flex: 1 }}>
                {/*
                <WebView
                javaScriptEnabled={true}

                style={styles.map}
                source={{
                    html: '<iframe src="https://www.google.com/maps/embed/v1/place?key='+GOOGLE_KEY+'&q='+ address + '" width=\'100%\' height=\'100%\'"/>'}}
                    // html: '<!DOCTYPE html><html><head>    <meta name="viewport" content="width=device-width, initial-scale=1.0">\</head><body><iframe src="https://www.google.com/maps/embed/v1/place?key='+GOOGLE_KEY+'&q='+ address + '"/><style>*{margin:0;padding:0;width:"100%";height:"100%"}</style></body>    </html>'}}
            />
                */}
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
                        title="Marker Title"
                        description="Marker Description"
                    />
                    {/* Add more markers as needed */}
                </MapView>
            </View>

        )
};

export default MapMobile;