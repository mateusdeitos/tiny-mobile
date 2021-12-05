import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { theme } from './styles/theme';
import Routes from './routes';
import { AppContextProvider } from './contexts';

export default function App() {
	return (
		<NavigationContainer theme={theme}>
			<AppContextProvider>
				<Routes />
			</AppContextProvider>
		</NavigationContainer>

	);
}

