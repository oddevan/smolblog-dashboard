import React from "react";
import { createContext, Fragment, useContext, useState } from "react";

export interface SmolblogContextProps {
	token: string|null;
    siteId: string|null;

	setSmolblogCode: Function;
    setCurrentSiteId: Function;
	logoutSmolblog: Function;
}
const SmolblogContext = createContext<SmolblogContextProps>({
	token: null,
    siteId: null,
	setSmolblogCode: () => {},
    setCurrentSiteId: () => {},
	logoutSmolblog: () => {},
});

export default function SmolblogProvider({ children = <Fragment /> }) {
	const [token, setToken] = useState<string|null>(null);
	const [siteId, setSiteId] = useState<string|null>(null);

	const setSmolblogCode = (code: string) => {
		setToken(code);
	};

    const setCurrentSiteId = (id: string) => {
        setSiteId(id);
    }

	const logoutSmolblog = () => {
		setToken(null);
        setSiteId(null);
	};

	return (
		<SmolblogContext.Provider
			value={{
				token,
                siteId,
				setSmolblogCode,
                setCurrentSiteId,
				logoutSmolblog,
			}}
		>
			{children}
		</SmolblogContext.Provider>
	);
}

export function useSmolblog() {
	const context = useContext(SmolblogContext);

	if (!context)
		throw new Error("useSmolblog must be used inside a `SmolblogProvider`");

	return context;
}