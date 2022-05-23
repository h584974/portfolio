export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export type AppContext = {
    theme: Theme,
    toggleTheme: () => void,
}