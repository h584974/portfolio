import { createContext, useEffect, useState } from "react";
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

    useEffect( () => {
        const storedTheme = localStorage.getItem('theme')
        const storedLanguage = localStorage.getItem('language')
        if (storedTheme) setTheme( storedTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT )
        if (storedLanguage) setLanguage( storedLanguage === Language.NORSK ? Language.NORSK : Language.ENGLISH )
    }, [])

    const toggleTheme = () => setTheme( theme => {
        const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        localStorage.setItem('theme', newTheme)
        return newTheme
    })

    const toggleLanguage = () => setLanguage( language => {
        const newLanguage = language === Language.ENGLISH ? Language.NORSK : Language.ENGLISH
        localStorage.setItem('language', newLanguage)
        return newLanguage
    })

    const context = {
        theme,
        toggleTheme,
        language,
        toggleLanguage
    }

    return <Context.Provider value={context}>{children}</Context.Provider>
}