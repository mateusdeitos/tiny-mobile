import React from "react";
import { View, Text } from 'react-native';
import { styles } from './styles';

export const Pedidos: React.FC = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text>Pedidos</Text>
		</View>
	)
}