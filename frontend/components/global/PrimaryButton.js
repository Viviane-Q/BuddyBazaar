import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';


export default function PrimaryButton({ label, onPress, icon }) {
    return (
        <View>
            <Button icon={icon} mode="contained" onPress={onPress}>
                {label}
            </Button>
        </View>
    );
}