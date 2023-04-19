import { StyleSheet, View, Pressable, Text } from 'react-native';
import { Button } from 'react-native-paper';


export default function SecondaryButton({ label, onPress, icon }) {
    return (
        <View>
            <Button icon={icon} mode="outlined" onPress={onPress}>
                {label}
            </Button>
        </View>
    );
}

const styles = StyleSheet.create({
    
});