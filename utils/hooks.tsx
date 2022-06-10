import { useContext, useEffect, useState } from 'react'
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

export function useInterval(callback: () => any, initialInterval: number = 1000, immediate: boolean = false): 
{
    active: boolean, 
    updateInterval: React.Dispatch<React.SetStateAction<number>>, 
    startInterval: () => void, 
    stopInterval: () => void
} 
{
    const [trigger, setTrigger] = useState<{}>({ message: 'init' })
    const [interval, setInterval] = useState<number>(initialInterval)
    const [active, setActive] = useState<boolean>(false)

    useEffect( () => {
        if (immediate) setActive(true)
    }, [])

    useEffect( () => {
        if (active) {
            setTimeout( () => setTrigger({ message: 'ping' }), interval)
            callback()
        }
    }, [trigger, active])

    const startInterval = () => setActive(true)
    const stopInterval = () => setActive(false)

    return {
        active,
        updateInterval: setInterval,
        startInterval,
        stopInterval,
    }
}