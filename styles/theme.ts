import { DefaultTheme } from '@react-navigation/native';

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#0050dc",
		icon: {
			focused: "#0050dc",
			default: "#aaa",
			disabled: "#ddd"
		},
		headerText: "#fff",
	}
}

export type CustomTheme = typeof theme;