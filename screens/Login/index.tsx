import { useTheme } from "@react-navigation/native";
import React from "react";
import { View, Text } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAuth } from "../../contexts/useAuth";
import { CustomTheme } from "../../styles/theme";
import { styles } from './styles';

export const Login: React.FC = ({ children }) => {
	const theme = useTheme() as CustomTheme;
	const { login } = useAuth();
	return (
		<View style={styles.container}>
			<TouchableOpacity style={{
				backgroundColor: theme.colors.primary,
				paddingHorizontal: 20,
				paddingVertical: 10,
				borderRadius: 10,
			}} onPress={() => login("joao@email.com", "123")}>
				<Text style={{
					color: theme.colors.headerText,
				}}>Login</Text>
			</TouchableOpacity>
		</View>
	)
}