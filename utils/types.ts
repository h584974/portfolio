export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum Language {
    ENGLISH = 'english',
    NORSK = 'norsk',
}

export type AppContext = {
    theme: Theme,
    toggleTheme: () => void,
    language: Language,
    toggleLanguage: () => void,
}