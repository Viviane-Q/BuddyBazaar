import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../store/slices/authSlice';
import { setName } from '../store/slices/authSlice';
import { registerUser } from '../store/thunks/authThunk';

const RegisterPage = () => {
    const dispatch = useDispatch();
    const [ snackbarVisible, setSnackbarVisible ] = useState(false);
    const [ snackbarType, setSnackbarType ] = useState('error');
    const [ snackbarMessage, setSnackbarMessage ] = useState('Une erreur est survenue');
    const { email, name } = useSelector((state) => state.auth);
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        const res = dispatch(registerUser({password}));
        res.then((res) => {
            setSnackbarVisible(true);
            if(!res.payload){
                setSnackbarType('error');
                setSnackbarMessage('Une erreur est survenue');
                return;
            }
            if(res.payload.error){
                setSnackbarType('error');
                setSnackbarMessage(res.payload.message);
                return;
            }
            if(!res.payload.error){
                setSnackbarType('success');
                setSnackbarMessage(res.payload.message);
                return;
            }

        });
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
            <View style={styles.form}>
            <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    style={snackbarType === 'error' ? styles.error : styles.success}
                    action={{
                        label: 'x',
                        onPress: () => {
                            setSnackbarVisible(false)
                        },
                    }}
                   >
                    {snackbarMessage}
                </Snackbar>
                <View style={styles.inputContainer}>
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
                </View>
                <Button
                    onPress={handleRegister}
                    mode="outlined"
                    icon="account-multiple-plus"   
                >S'inscrire</Button>
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
    form: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '50%',
    },
    button: {
        width: '100%',
    },
    error: {
        backgroundColor: '#e35d6a',
    },
    success: {
        backgroundColor: '#479f76',
    }

});

export default RegisterPage;
