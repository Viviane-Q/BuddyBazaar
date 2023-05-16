import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Snackbar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setName } from '../../store/slices/authSlice';
import { registerUser } from '../../store/thunks/authThunk';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const [snackbarMessage, setSnackbarMessage] = useState(
    'Une erreur est survenue'
  );
  const { email, name } = useSelector((state) => state.auth);
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Check if all fields are filled
    if (!email || !name || !password) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage('Tous les champs doivent être remplis');
      return;
    }
    // Check if password is valid (at least 8 characters, one uppercase, one lowercase, one number and one special character)
    if (
      /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/.test(
        password
      ) === false
    ) {
      setSnackbarVisible(true);
      setSnackbarType('error');
      setSnackbarMessage(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
      );
      return;
    }
    const res = dispatch(registerUser({ password }));
    res.then((res) => {
      setSnackbarVisible(true);
      if (!res.payload) {
        setSnackbarType('error');
        setSnackbarMessage('Une erreur est survenue');
        return;
      }
      if (res.payload.error) {
        setSnackbarType('error');
        setSnackbarMessage("L'adresse email est déjà utilisée");
        return;
      }
      if (!res.payload.error) {
        setSnackbarType('success');
        setSnackbarMessage(
          'Vous êtes inscrit, vous pouvez maintenant vous connecter'
        );
        // Clear fields
        dispatch(setEmail(''));
        dispatch(setName(''));
        setPassword('');
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
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        style={snackbarType === 'error' ? styles.error : styles.success}
        action={{
          label: '⨯',
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Votre nom"
            placeholder="Votre nom"
            onChangeText={handleName}
            value={name}
            mode="outlined"
            onSubmitEditing={handleRegister}
            nativeID='registerNameInput'
          />
          <TextInput
            label="Adresse email"
            placeholder="Adresse email"
            onChangeText={handleEmail}
            value={email}
            mode="outlined"
            onSubmitEditing={handleRegister}
            nativeID='registerEmailInput'
          />
          <TextInput
            label="Mot de passe"
            placeholder="Mot de passe"
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
            mode="outlined"
            onSubmitEditing={handleRegister}
            nativeID='registerPasswordInput'
          />
        </View>
        <Button
          style={styles.button}
          onPress={handleRegister}
          mode="outlined"
          icon="account-multiple-plus"
          nativeID='registerButton'
        >
          S&apos;inscrire
        </Button>
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '50%',
    gap: 24,
  },
  inputContainer: {
    minWidth: 300,
    gap: 10,
  },
  button: {
    minWidth: 300,
    borderRadius: 5
  },
  error: {
    backgroundColor: '#e35d6a',
  },
  success: {
    backgroundColor: '#479f76',
  },
});

export default RegisterPage;
