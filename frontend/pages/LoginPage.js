import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {TextInput} from 'react-native-paper';
import PrimaryButton from '../components/global/PrimaryButton';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Fonction pour gérer la connexion
        console.log("username => ", username)
        console.log("password => ", password)
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
                label="Nom d'utilisateur"
                placeholder="Nom d'utilisateur"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                label="Mot de passe"
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />
            <PrimaryButton
            label="Se connecter"
            onPress={handleLogin}
            icon="login"
            />
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
    button: {
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default LoginPage;
