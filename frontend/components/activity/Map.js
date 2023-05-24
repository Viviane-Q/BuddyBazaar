import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
const GOOGLE_KEY = Constants.expoConfig.extra.googleKey;

const Map = ({ address }) => {
    if (Platform.OS === 'ios' || Platform.OS === 'android')
        return (
            <WebView
                javaScriptEnabled={true}

                style={styles.map}
                source={{
                    html: '<iframe src="https://www.google.com/maps/embed/v1/place?key='+GOOGLE_KEY+'&q='+ address + '" width=\'100%\' height=\'100%\'"/>'}}
                    // html: '<!DOCTYPE html><html><head>    <meta name="viewport" content="width=device-width, initial-scale=1.0">\</head><body><iframe src="https://www.google.com/maps/embed/v1/place?key='+GOOGLE_KEY+'&q='+ address + '"/><style>*{margin:0;padding:0;width:"100%";height:"100%"}</style></body>    </html>'}}
            />
        )
    else
        return (
            <iframe
                style={styles.map}
                src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_KEY}&q=${address}`}
                allowFullScreen={true}
            />
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