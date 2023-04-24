import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../store/slices/authSlice';
import { signInUser } from '../store/thunks/authThunk';

const LoginPage = () => {
    const dispatch = useDispatch();
    const { email } = useSelector((state) => state.auth);
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        dispatch(signInUser({password}))
    };

    const handleEmail = (text) => {
        dispatch(setEmail(text));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
            <TextInput
                label="Adresse email"
                placeholder="Adresse email"
                onChangeText={handleEmail}
                value={email}
            />
            <TextInput
                label="Mot de passe"
                placeholder="Mot de passe"
                secureTextEntry={true}
                onChangeText={setPassword}
                value={password}
            />
            <Button
                onPress={handleLogin}
                mpde="contained"
                icon="login"
            >Se connecter</Button>
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
