import React from "react";
import { AuthProvider } from "./useAuth";
import { OfflineModeProvider } from "./useOfflineMode";
import { ScreenListProvider } from "./useScreenList";

export const AppContextProvider: React.FC = ({ children }) => {
	return <>
		<AuthProvider>
			<OfflineModeProvider>
				<ScreenListProvider>
					{children}
				</ScreenListProvider>
			</OfflineModeProvider>
		</AuthProvider>
	</>
}