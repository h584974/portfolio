import Link from 'next/link'
import Styles from '../styles/Header.module.css'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    return (
        <div className={Styles.container}>
            <div className={`${Styles.left} inverted`}>
                <Link href='/'><a>HOME</a></Link>
            </div>
            <div className={`${Styles.right} inverted`}>
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}