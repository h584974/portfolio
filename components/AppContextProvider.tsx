import { NextOrObserver } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getDocumentData, onAuthStateChanged, onDocumentChanged, signInAnonymously } from "../services/firebase";
import { Theme, AppContext, Language, User, AuthUser, DbUser } from "../utils/types";

export const Context = createContext<AppContext>({
    theme: Theme.LIGHT,
    toggleTheme: () => {},
    language: Language.ENGLISH,
    toggleLanguage: () => {},
    user: null,
})

export default function AppContextProvider({ children }: { children: JSX.Element[] | JSX.Element }) {
    const [theme, setTheme] = useState<Theme>(Theme.LIGHT)
    const [language, setLanguage] = useState<Language>(Language.ENGLISH)
    const [authUser, setAuthUser] = useState<AuthUser>(null)
    const [dbUser, setDbUser] = useState<DbUser>(null)

    useEffect( () => {
        const storedTheme = localStorage.getItem('theme')
        const storedLanguage = localStorage.getItem('language')
        if (storedTheme) setTheme( storedTheme === Theme.DARK ? Theme.DARK : Theme.LIGHT )
        if (storedLanguage) setLanguage( storedLanguage === Language.NORSK ? Language.NORSK : Language.ENGLISH )

        const unsub = onAuthStateChanged(setAuthUser)
        
        return unsub
    }, [])

    useEffect( () => {
        if (authUser) {
            const unsub = onDocumentChanged('users', authUser.uid, setDbUser)
            return unsub
        }
        else {
            signInAnonymously()
        }
    }, [authUser])

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

    const user: User = !authUser ? null : {
        uid: authUser.uid,
        email: authUser.email,
        ...dbUser ?? { username: null, snakeHighScore: null },
    }

    const context = {
        theme,
        toggleTheme,
        language,
        toggleLanguage,
        user,
    }

    return (
        <Context.Provider value={context}>
            <div id='themeRoot' className={theme}>
                {children}
            </div>
        </Context.Provider>
    )
}