import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from "../../store/thunks/authThunk";
import { setToken } from "../../store/slices/authSlice";
import TitleMedium from "../../components/shared/typography/TitleMedium";
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfilePage = ({ navigation }) => {
	const dispatch = useDispatch();
	const { name, email } = useSelector((state) => state.auth);

	useEffect(() => {
		const fetchUser = async () => {
			const res = await dispatch(getUser());
			if (!res.payload) {
				setSnackbarVisible(true);
				setSnackbarType('error');
				setSnackbarMessage('Une erreur est survenue');
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
					<TextInput label="Nom" value={name} editable={false}/>
					<TextInput label="Adresse e-mail" value={email} editable={false} style={styles.textInput}/>
				</View>
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Button onPress={disconnect}
					mode="contained"
					style={styles.disconnectButton}
					icon="exit-to-app">
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
	textInput: {
		underLineColor: 'transparent',
		outlineColor: 'transparent',
	},
	buttonContainer: {
		padding: 16,
		justifyContent: 'center',
	},
	disconnectButton: {
		borderRadius: 5,
		alignSelf: 'flex-end',
	},
	error: {
		backgroundColor: '#e35d6a',
	},
	success: {
		backgroundColor: '#479f76',
	},
});

export default UserProfilePage
