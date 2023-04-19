import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginPage from "./pages/LoginPage";
import { Provider } from 'react-redux';
import { MD3LightTheme as DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import store from './store/store';

// For icons:  https://oblador.github.io/react-native-vector-icons/

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#37474F",
		primaryContainer: "#ECEFF1",
		secondary: "#009688",
		secondaryContainer: "#E0F2F1",
		tertiary: "#FFC107",
		tertiaryContainer: "#FFF8E1",
		surface: "#FFFFFF",
		surfaceVariant: "#F5F5F5",
		surfaceDisabled: "#E0E0E0",
		background: "#FAFAFA",
		error: "#F44336",
		errorContainer: "#FFEBEE",
		onPrimary: "#FFFFFF",
		onPrimaryContainer: "#000000",
		onSecondary: "#FFFFFF",
		onSecondaryContainer: "#000000",
		onTertiary: "#212121",
		onTertiaryContainer: "#FFFFFF",
		onSurface: "#212121",
		onSurfaceVariant: "#212121",
		onSurfaceDisabled: "#9E9E9E",
		onError: "#FFFFFF",
		onErrorContainer: "#212121",
		onBackground: "#212121",
		outline: "#BDBDBD",
		outlineVariant: "#EEEEEE",
		inverseSurface: "#000000",
		inverseOnSurface: "#FFFFFF",
		inversePrimary: "#FFFFFF",
		shadow: "#0000001A",
		scrim: "#00000099",
		backdrop: "#000000CC",
	}
}

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