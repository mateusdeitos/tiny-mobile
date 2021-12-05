import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/useAuth';
import { CustomTheme } from '../styles/theme';
import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

const Routes: React.FC = () => {
	const { loggedIn, isLoading } = useAuth();
	const theme = useTheme() as CustomTheme;

	if (isLoading) {
		return <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
			<ActivityIndicator size="large" color={theme.colors.primary} />
		</View>
	}

	return loggedIn ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;