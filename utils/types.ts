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

export enum Input {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    QUIT,
    UNDEFINED,
}

export type Text = {
    header: {
        home: string,
        contact: string,
    },

    front: {
        name: string,
        description: string,
    }
    
    intro: {
        title: string,
        description: string,
    }

    skills: {
        title: string,
        description: string,
    }
}