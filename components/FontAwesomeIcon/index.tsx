import { useTheme } from "@react-navigation/native";
import React from "react";
import { Icon } from "react-native-elements";
import { CustomTheme } from "../../styles/theme";

interface Props {
	name: string;
	focused: boolean;
	size?: number;
	color?: string;
}
export const FontAwesomeIcon = ({ focused, name, color, size }: Props) => {
	const theme = useTheme() as CustomTheme;

	const getIconColor = (isFocused: boolean) => {
		return isFocused ? theme.colors.icon.focused : theme.colors.icon.default;
	}

	return <Icon
		name={name}
		color={color ?? getIconColor(focused)}
		tvParallaxProperties
		type="font-awesome-5"
		size={size ?? 26}
	/>
}