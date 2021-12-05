import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CustomDrawer } from './components/Drawer';
import { theme } from './styles/theme';
import { ScreenListProvider } from './contexts/useScreenList';
import { OfflineModeProvider } from './contexts/useOfflineMode';

export default function App() {
	return (
		<NavigationContainer theme={theme}>
			<OfflineModeProvider>
				<ScreenListProvider>
					<CustomDrawer />
				</ScreenListProvider>
			</OfflineModeProvider>
		</NavigationContainer>

	);
}

