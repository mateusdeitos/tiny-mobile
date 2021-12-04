import React from "react";
import { View, Text } from 'react-native';
import { styles } from './styles';

export const Configuracoes: React.FC = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text>Configurações</Text>
		</View>
	)
}