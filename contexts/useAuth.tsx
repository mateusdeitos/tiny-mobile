import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
	id: number;
	nome: string;
	email: string;
}

interface AuthContextData {
	loggedIn: boolean;
	isLoading: boolean;
	user?: User;
	permissions?: Record<string, boolean>;
	token?: string;
	login: (user: string, password: string) => Promise<void>;
	logoff: () => Promise<void>;
}

type AuthState = Pick<AuthContextData, "loggedIn" | "user" | "permissions" | "token">;

const AuthContext = createContext({} as AuthContextData);
export const useAuth = () => useContext(AuthContext);

const mockLogin = async (user: string, password: string): Promise<AuthState> => {
	const mockDb = [
		{
			user: {
				id: 1,
				nome: "João",
				email: "joao@email.com"
			},
			token: "128379219231978312978",
			permissions: {
				vendas: true,
				contatos: true,
			}
		}
	];

	if (!password) {
		throw new Error("Senha incorreta");
	}

	const registro = mockDb.find(registro => registro.user.email === user);
	if (!registro) {
		throw new Error("Usuário não encontrado");
	}

	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				loggedIn: true,
				user: registro.user,
				token: registro.token,
				permissions: registro.permissions
			})
		}, 2000);
	})

}


export const AuthProvider: React.FC = ({ children }) => {
	const storage = useAsyncStorage("@auth");
	const [state, setState] = useState<AuthState>({} as AuthState);
	const [isLoading, setIsLoading] = useState(false);

	const login = async (user: string, password: string) => {
		try {
			setIsLoading(true);
			const data = await mockLogin(user, password);
			setState(data);
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
				return;
			}

			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	const logoff = async () => {
		setState({ loggedIn: false });
		await storage.removeItem();
	}

	useEffect(() => {
		storage.getItem().then(data => {
			console.log(data);
			if (!data) {
				setState({ loggedIn: false });
				return;
			}

			try {
				const authData = JSON.parse(data);
				const { token, user, permissions } = authData;
				setState({ loggedIn: true, token, user, permissions });
			} catch (error) {
				setState({ loggedIn: false });
			}

		});
	}, []);


	return <AuthContext.Provider value={{ ...state, login, logoff, isLoading }}>{children}</AuthContext.Provider>;
}