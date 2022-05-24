import { createContext, useState } from "react";
import { Theme, AppContext, Language } from "../utils/types";

export const Context = createContext<AppContext>({
    theme: Theme.LIGHT,
    toggleTheme: () => {},
    language: Language.ENGLISH,
    toggleLanguage: () => {},
})

export default function AppContextProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
    const [language, setLanguage] = useState<Language>(Language.ENGLISH)

    const toggleTheme = () => setTheme( theme => theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT )
    const toggleLanguage = () => setLanguage( language => language === Language.ENGLISH ? Language.NORSK : Language.ENGLISH )

    const context = {
        theme,
        toggleTheme,
        language,
        toggleLanguage
    }

    return <Context.Provider value={context}>{children}</Context.Provider>
}