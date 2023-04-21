import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from "./pages/LoginPage";
import { Provider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper';
import store from './store/store';
import theme from './theme';
// For icons:  https://oblador.github.io/react-native-vector-icons/


export default function App() {
	return (
		<PaperProvider theme={theme}>
			<Provider store={store}>
				<View style={styles.container}>
					<LoginPage />
				</View>
			</Provider>
		</PaperProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});