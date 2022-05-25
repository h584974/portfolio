import { useAppContext } from '../utils/hooks'
import Styles from '../styles/Icons.module.css'
import { Theme } from '../utils/types'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useAppContext()
    return <button onClick={toggleTheme} className={theme === Theme.LIGHT ? Styles.sun : Styles.moon}></button>
}