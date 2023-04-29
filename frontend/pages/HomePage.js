import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, BottomNavigation, Text } from 'react-native-paper';
import { setToken } from '../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MusicRoute = () => <Text>Music</Text>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = ()  => {
    return ( <Text>Recents</Text>);
};

const NotificationsRoute = () => <Text>Notifications</Text>;


const HomePage = ({ navigation }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const disconnect = () => {
        dispatch(setToken(null));
        AsyncStorage.removeItem('token');
        navigation.navigate('Landing');
    };

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'discover', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
        { key: 'albums', title: 'Albums', focusedIcon: 'message', badge: 10 },
        { key: 'recents', title: 'Recents', focusedIcon: 'history', badge: true },
        { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        music: MusicRoute,
        albums: AlbumsRoute,
        recents: RecentsRoute,
        notifications: NotificationsRoute,
    });

    return (
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text>Home Page</Text>
            {token &&
                <Button
                    onPress={disconnect}
                    mode="contained"
                >Se déconnecter</Button>
            }
            <BottomNavigation style={styles.navigationBar}
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    navigationBar: {
        borderTopWidth: 4   

    },
});
        

export default HomePage;