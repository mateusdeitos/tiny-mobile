import React, { createContext, useContext, useEffect, useState } from "react";
import { Configuracoes } from "../screens/Configuracoes";
import { Contatos } from "../screens/Contatos";
import { Pedidos } from "../screens/Pedidos";
import { Sincronizacao } from "../screens/Sincronizacao";
import { useOfflineMode } from "./useOfflineMode";
import { FontAwesomeIcon } from "../components/FontAwesomeIcon";
import { CustomTheme } from "../styles/theme";
import { useTheme } from "@react-navigation/native";

interface Route {
	name: string;
	Component?: React.FunctionComponent;
	icon?: (props: {
		focused: boolean;
		size: number;
		color: string;
	}) => React.ReactNode;
	label?: string | ((params: Record<string, any>) => string);
	onPress?: (params?: any) => void;
}

interface Screens {
	groups: {
		routes: Route[];
	}[];
}

const ScreenListContext = createContext<Screens>({} as Screens);

export const ScreenListProvider: React.FC = ({ children }) => {
	const { isOnline, toggleOfflineMode } = useOfflineMode();
	const theme = useTheme() as CustomTheme;
	const [state, setState] = useState<Screens>({
		groups: [
			{
				routes: [
					{
						name: "Pedidos",
						Component: Pedidos,
						label: "Pedidos",
						icon: (props) => <FontAwesomeIcon name="shopping-cart" {...props} />
					},
					{
						name: "Contatos",
						Component: Contatos,
						label: "Contatos",
						icon: (props) => <FontAwesomeIcon name="users" {...props} />
					},
				]
			},
			{
				routes: [
					{
						name: "Sincronização",
						Component: Sincronizacao,
						icon: (props) => <FontAwesomeIcon name="sync-alt" {...props} />
					},
				]
			},
			{
				routes: [
					{
						name: "Configurações",
						Component: Configuracoes,
						label: "Configurações",
						icon: (props) => <FontAwesomeIcon name="cogs" {...props} />
					}
				]
			}
		]
	});

	const removeElement = (route: Route) => {
		setState({
			...state,
			groups: state.groups.map(group => ({
				...group,
				routes: group.routes.filter(r => r.name !== route.name)
			}))
		});
	}

	const addElement = (route: Route, after: string) => {
		const groupIndex = state.groups.findIndex(group => group.routes.find(r => r.name === after));
		if (groupIndex >= 0) {
			const newGroup = {
				...state.groups[groupIndex],
				routes: [
					...state.groups[groupIndex].routes.filter(r => r.name !== route.name),
					route
				]
			};
			const newGroups = [
				...state.groups.slice(0, groupIndex),
				newGroup,
				...state.groups.slice(groupIndex + 1)
			];
			setState({
				...state,
				groups: newGroups
			});
		}
	}

	useEffect(() => {
		const route: Route = {
			name: "offline_switch",
			onPress: toggleOfflineMode,
			label: isOnline ? "Ficar Offline" : "Ficar Online",
			icon: (props) => <FontAwesomeIcon name="cloud"  {...props} color={isOnline ? theme.colors.icon.focused : theme.colors.icon.disabled} />
		};
		removeElement(route);
		addElement(route, "Sincronização");
	}, [isOnline]);

	return <ScreenListContext.Provider value={state}>
		{children}
	</ScreenListContext.Provider>
}


export const useScreenList = () => useContext(ScreenListContext);