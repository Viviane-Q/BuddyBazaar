import React, {useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button} from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon';
import {useDispatch, useSelector} from 'react-redux';


const LandingPage = ({navigation}) => {
    const { token } = useSelector((state) => state.auth);
	useEffect(() => {
        if (token) {
          navigation.navigate('Home'); 
        }
    }, [token]);
    return (
        <View style={styles.container}>
            <Icon source="account-group" size={30}/>
            <Text style={styles.title}>BuddyBazaar</Text>
            <View style={styles.options}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    mode="outlined"
                    icon="account-multiple-plus"
                    style={styles.button}
                >Inscription</Button>
                <Button
                    onPress={() => navigation.navigate('Login')}
                    mode="contained"
                    icon="login"
                    style={styles.button}
                >Connexion</Button>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    mode="outlined"
                    icon="map-search"
                    style={styles.button}
                >Découvrir</Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        marginBottom: 30,
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '20%',
    },
    button: {
        width: '100%',
    }
    

});

export default LandingPage;
