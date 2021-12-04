import React, { createContext, useContext, useEffect, useState } from "react";
import { Configuracoes } from "../screens/Configuracoes";
import { Contatos } from "../screens/Contatos";
import { Pedidos } from "../screens/Pedidos";
import { Sincronizacao } from "../screens/Sincronizacao";
import { useOfflineMode } from "./useOfflineMode";

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
	const [state, setState] = useState<Screens>({
		groups: [
			{
				routes: [
					{
						name: "Pedidos",
						Component: Pedidos,
						label: "Pedidos",
					},
					{
						name: "Contatos",
						Component: Contatos,
						label: "Contatos",
					},
				]
			},
			{
				routes: [
					{
						name: "Sincronização",
						Component: Sincronizacao,
					},
					{
						name: "offline_switch",
					}
				]
			},
			{
				routes: [
					{
						name: "Configurações",
						Component: Configuracoes,
						label: "Configurações"
					}
				]
			}
		]
	});
	const { isOnline, toggleOfflineMode } = useOfflineMode();

	useEffect(() => {
		setState((state) => ({
			...state,
			groups: state.groups.map((group) => ({
				...group,
				routes: group.routes.map((route) => {
					if (!(route.name === 'offline_switch')) {
						return route;
					}

					return {
						...route,
						onPress: toggleOfflineMode,
						label: isOnline ? 'Ficar Offline' : 'Ficar Online'
					}
				})
			}))
		}));
	}, [isOnline]);

	return <ScreenListContext.Provider value={state}>
		{children}
	</ScreenListContext.Provider>
}


export const useScreenList = () => useContext(ScreenListContext);