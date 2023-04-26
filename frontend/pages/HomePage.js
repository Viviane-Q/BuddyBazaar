import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { setToken } from '../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomePage = ({ navigation }) => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const disconnect = () => {
        dispatch(setToken(null));
        AsyncStorage.removeItem('token');
        navigation.navigate('Landing');
    };
    return (
        <View>
            <Text>Home Page</Text>
            {token &&
                <Button
                    onPress={disconnect}
                    mode="contained"
                >Se déconnecter</Button>
            }
        </View>
    );
};


export default HomePage;