import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';


const LandingPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>BuddyBazaar</Text>
            <div style={styles.options}>
                <Button
                    onPress={() => navigation.navigate('Register')}
                    mode="outlined"
                    icon="account-multiple-plus"
                    style={styles.button}
                >S'inscrire</Button>
                <Button
                    onPress={() => navigation.navigate('Login')}
                    mode="contained"
                    icon="login"
                    style={styles.button}
                >Se connecter</Button>
                <Button
                    onPress={() => navigation.navigate('Home')}
                    mode="outlined"
                    icon="map-search"
                    style={styles.button}
                >Découvrir</Button>
            </div>
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
