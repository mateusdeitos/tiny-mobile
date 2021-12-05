import React, { useState } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Divider } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';
import { CustomTheme } from '../../styles/theme';
import { useScreenList } from '../../contexts/useScreenList';

export type CallbacksOnPress = {
	toggleConnection: () => void;
	isOnline: () => boolean;
};


const Drawer = createDrawerNavigator();

export const CustomDrawer = () => {
	const theme = useTheme() as CustomTheme;
	const screens = useScreenList();
	return (
		<Drawer.Navigator
			initialRouteName="Pedidos"
			screenOptions={{
				headerStyle: {
					backgroundColor: theme.colors.primary
				},
				headerTintColor: theme.colors.headerText,
				drawerContentStyle: {
					paddingTop: 20
				}
			}}
			drawerContent={(props) => <Component {...props} />}
		>
			{screens.groups.map(({ routes }) => (
				routes.map(route => {
					if (route.Component) {
						return <Drawer.Screen key={route.name} name={route.name} component={route.Component} />
					}
					return <></>;
				})
			))}
		</Drawer.Navigator>
	)


}

const Component = (props: DrawerContentComponentProps) => {
	const theme = useTheme() as CustomTheme;
	const { descriptors, navigation, state } = props;
	const screens = useScreenList();

	const isFocused = (routeName: string) => {
		const routes = Object.entries(descriptors).reduce((acc, [key, descriptor]) => ({ ...acc, [key]: descriptor.route.name }), {});
		const [lastRoute] = state.history.filter(item => item.type === 'route').reverse();

		// Ignoro porque eu filtrei apenas por type == 'route' e o typescript n reconhece que nesse cenário sempre terá o key
		//@ts-ignore
		if (lastRoute?.key) {
			//@ts-ignore
			const check = routes[lastRoute.key] === routeName;
			return check;
		}

		return false;
	}

	return (
		<DrawerContentScrollView {...props}>

			{screens.groups.map(({ routes }, index, self) => {
				const isLastGroup = index === self.length - 1;

				return routes.map(({ name, label, icon, onPress }, index, self) => {
					const onPressRoute = onPress ?? (() => navigation.navigate(name));
					const isLastRouteOfGroup = index === self.length - 1;
					const props = {
						activeTintColor: theme.colors.headerText,
						activeBackgroundColor: theme.colors.primary,
						icon,
						label: label ?? name,
						onPress: onPressRoute,
						focused: isFocused(name),
					};

					return <React.Fragment key={name}>
						<DrawerItem {...props} />
						{isLastRouteOfGroup && !isLastGroup && <Divider />}
					</React.Fragment>
				})
			}
			)}
		</DrawerContentScrollView>
	);
}