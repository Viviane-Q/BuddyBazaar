import React from 'react';
import { SafeAreaView } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { store } from './store/store';
import theme from './theme';
import Stacks from './pages/Stacks';
// For icons:  https://oblador.github.io/react-native-vector-icons/


export default function App() {
	return (
		<PaperProvider theme={theme}>
			<SafeAreaView style={{ flex: 1 }}>
				<Provider store={store}>
					<Stacks />
				</Provider>
			</SafeAreaView>
		</PaperProvider>
	);
}
