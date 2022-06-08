import { User as USER } from "firebase/auth"

export enum Theme {
    LIGHT = 'light',
    DARK = 'dark',
}

export enum Language {
    ENGLISH = 'english',
    NORSK = 'norsk',
}

export type AuthUser = USER | null

export type DbUser = null | {
    username: string | null,
    snakeHighScore: number | null
}

export type User = null | {
    uid: string,
    email: string | null,
    username: string | null,
    snakeHighScore: number | null,
}

export type AppContext = {
    theme: Theme,
    toggleTheme: () => void,
    language: Language,
    toggleLanguage: () => void,
    user: User,
}

export enum Input {
    UP,
    DOWN,
    LEFT,
    RIGHT,
    QUIT,
    UNDEFINED,
}

export enum Direction {
    UP,
    DOWN,
    LEFT,
    RIGHT,
}

export type Point2D = {
    x: number,
    y: number;
}

export type Snake = Point2D[]

export type Food = Point2D[]

export type Text = {
    navbar: {
        home: string,
        about: string,
        projects: string,
        contact: string,
        cv: string,
        games: string,
    },

    front: {
        name: string,
        description: string,
    },
    
    about: {
        title: string,
        description: string,
    },

    skills: {
        title: string,
        description: string,
        technologies: string,
    },

    snake: {
        score: string,
        highScore: string,
        leaderboard: string,
        usernamePlaceholder: string,
        usernameSubmit: string,
        startGame: string,
        gameOver: string,
    },

    contact: {
        title: string,
        namePlaceholder: string;
        emailPlaceholder: string,
        messagePlaceholder: string,
        sendMessage: string,
        success: string,
        error: string,
    },
}