import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './store/store';
import theme from './theme';
import Stacks from './pages/Stacks';
// For icons:  https://oblador.github.io/react-native-vector-icons/


export default function App() {
	return (
		<PaperProvider theme={theme}>
			<Provider store={store}>
				<View style={styles.container}>
					<Stacks />
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