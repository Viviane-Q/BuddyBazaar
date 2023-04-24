import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../store/slices/authSlice';
import { setName } from '../store/slices/authSlice';
import { registerUser } from '../store/thunks/authThunk';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const { email, name } = useSelector((state) => state.auth);
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        dispatch(registerUser({password}));
    };

    const handleEmail = (text) => {
        dispatch(setEmail(text));
    };
    const handleName = (text) => {
        dispatch(setName(text));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inscription</Text>
            <TextInput
                label="Votre nom"
                placeholder="Votre nom"
                onChangeText={handleName}
                value={name}
            />
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
                onPress={handleRegister}
                mode="outlined"
                icon="account-multiple-plus"   
            >S'inscrire</Button>
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

export default RegisterPage;
