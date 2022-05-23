import { createContext, useState } from "react";
import { Theme, AppContext } from "../utils/types";

export const Context = createContext<AppContext>({
    theme: Theme.LIGHT,
    toggleTheme: () => {},
})

export default function AppContextProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
    console.log(theme);

    const toggleTheme = () => setTheme( theme => theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT )

    const context = {
        theme,
        toggleTheme,
    }

    return <Context.Provider value={context}>{children}</Context.Provider>
}