import { useContext } from 'react'
import { Context } from '../components/AppContextProvider'
import { English, Norsk } from './text';
import { AppContext, Language, Text } from './types'

export function useAppContext(): AppContext {
    return useContext(Context);
}

export function useText(): Text {
    const { language } = useAppContext()

    switch (language) {
        case Language.ENGLISH: return English;
        case Language.NORSK: return Norsk;
        default: return English;
    }
}