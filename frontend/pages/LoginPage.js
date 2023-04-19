import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import PrimaryButton from '../components/global/PrimaryButton';
import SecondaryButton from '../components/global/SecondaryButton';
import auth from '../gateways/auth';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        console.log('Login');
        auth.login(email, password);
    };
    const handleRegister = () => {
        console.log('Register');
        auth.register(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
                label="Adresse email"
                placeholder="Adresse email"
                onChangeText={setEmail}
                value={email}
            />
            <TextInput
                label="Mot de passe"
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />
            <SecondaryButton
                label="S'inscrire"
                onPress={handleRegister}
                icon="account-multiple-plus"
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
