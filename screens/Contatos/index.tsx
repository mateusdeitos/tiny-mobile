import React from "react";
import { View, Text } from 'react-native';
import { styles } from './styles';

export const Contatos: React.FC = ({ children }) => {
	return (
		<View style={styles.container}>
			<Text>Contatos</Text>
		</View>
	)
}