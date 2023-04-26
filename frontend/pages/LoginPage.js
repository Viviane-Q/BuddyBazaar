import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Text, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail } from '../store/slices/authSlice';
import { signInUser } from '../store/thunks/authThunk';

const LoginPage = ({ navigation }) => {
    const dispatch = useDispatch();
    const [ snackbarVisible, setSnackbarVisible ] = useState(false);
    const [ snackbarType, setSnackbarType ] = useState('error');
    const [ snackbarMessage, setSnackbarMessage ] = useState('Une erreur est survenue');
    const { email, token } = useSelector((state) => state.auth);
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const res = dispatch(signInUser({ password }));
        res.then((res) => {
            console.log(res);
            if(!res.payload){
                setSnackbarVisible(true);
                setSnackbarType('error');
                setSnackbarMessage('Une erreur est survenue');
                return;
            }
            if(res.payload.error){
                setSnackbarVisible(true);
                setSnackbarType('error');
                setSnackbarMessage(res.payload.message);
                return;
            }
            if(!res.payload.error){
                setSnackbarVisible(true);
                setSnackbarType('success');
                setSnackbarMessage(res.payload.message);
                return;
            }

        });
    };

    const handleEmail = (text) => {
        dispatch(setEmail(text));
    };
    useEffect(
        () => {
            if (token) {
                navigation.navigate('Home');
            }
        }, [token]
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connexion</Text>
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
                        label="Adresse email"
                        placeholder="Adresse email"
                        onChangeText={handleEmail}
                        value={email}
                        style={styles.textInput}
                    />
                    <TextInput
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        secureTextEntry={true}
                        onChangeText={setPassword}
                        value={password}
                        style={{ width: '100%' }}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </View>
                <Button style={styles.button}
                    onPress={handleLogin}
                    mode="contained"
                    icon="login"
                >Se connecter</Button>
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
    inputContainer: {
        width: '100%',
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

export default LoginPage;
