import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#0050dc",
		headerText: "#fff",
	}
}

export type CustomTheme = typeof theme;