import React, {useState, useEffect} from 'react';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {TextInput, Button, Title, Snackbar, Divider, IconButton} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {getUser} from "../store/thunks/authThunk";
import TitleMedium from "../components/shared/typography/TitleMedium";
import {setToken} from '../store/slices/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfilePage = ({navigation}) => {
	const dispatch = useDispatch();
	const [snackbarVisible, setSnackbarVisible] = useState(false);
	const [snackbarType, setSnackbarType] = useState('error');
	const [snackbarMessage, setSnackbarMessage] = useState('Une erreur est survenue');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		const fetchUser = async () => {
			const res = await dispatch(getUser());
			if (!res.payload) {
				setSnackbarVisible(true);
				setSnackbarType('error');
				setSnackbarMessage('Une erreur est survenue');
			} else {
				const user = res.payload.res.user;
				setName(user.name);
				setEmail(user.email);
			}
		};

		fetchUser();
	}, []);

	const disconnect = () => {
		dispatch(setToken(null));
		AsyncStorage.removeItem('token');
		navigation.navigate('Landing');
	};

	return (
		<View style={styles.container}>
			<ScrollView>
				<View style={styles.viewContainer}>
					<TitleMedium>Profil</TitleMedium>
					<TextInput label="Nom" value={name} editable={false} />
					<TextInput label="Adresse e-mail" value={email} editable={false} />
				</View>
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Button onPress={disconnect} mode="outlined" style={styles.disconnectButton}>
					Se déconnecter
				</Button>
			</View>
		</View>
	);
};


const styles = StyleSheet.create({
	viewContainer: {
		gap: 18,
		margin: 18,
	},
	buttonContainer: {
		padding: 16,
	},
	disconnectButton: {
		width: '50%',
		alignSelf: 'center',
	},
});

export default UserProfilePage
