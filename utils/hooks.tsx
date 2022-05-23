import { useContext } from 'react'
import { Context } from '../components/AppContextProvider'
import { AppContext } from './types'

export function useAppContext(): AppContext {
    return useContext(Context);
}