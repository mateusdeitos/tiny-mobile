import React, { createContext, useContext, useState } from "react";

interface IUseOfflineMode {
	isOnline: boolean;
	toggleOfflineMode: () => void;
}
const OfflineModeContext = createContext<IUseOfflineMode>({} as IUseOfflineMode);

export const OfflineModeProvider: React.FC = ({ children }) => {
	const [isOnline, setIsOnline] = useState(true); // Todo usar listener no status da conexao
	const toggleOfflineMode = () => setIsOnline(prev => !prev);
	return <OfflineModeContext.Provider value={{ isOnline, toggleOfflineMode }}>
		{children}
	</OfflineModeContext.Provider>
}


export const useOfflineMode = () => useContext(OfflineModeContext);