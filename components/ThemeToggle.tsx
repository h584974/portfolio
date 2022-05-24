import { useAppContext } from '../utils/hooks'
import Styles from '../styles/Icons.module.css'
import { Theme } from '../utils/types'

export default function ThemeToggle() {
    const { theme, toggleTheme } = useAppContext()

    return (
        <a onClick={toggleTheme}>
            <p className={theme === Theme.LIGHT ? Styles.sun : Styles.moon}></p>
        </a>
    )
}