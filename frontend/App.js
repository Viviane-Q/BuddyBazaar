import {StatusBar} from 'expo-status-bar';
import {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
// import MonBouton from './components/MonBouton';
import LoginPage from "./components/LoginPage";
import {Provider} from 'react-redux';
import store from './store/store';

export default function App() {
	const [compteur, setCompteur] = useState(0);
	return (
		<Provider store={store}>
			<View style={styles.container}>
				<LoginPage/>
			</View>
		</Provider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});