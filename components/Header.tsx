import Link from 'next/link'
import Styles from '../styles/Header.module.css'
import { useText } from '../utils/hooks'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    const Text = useText();
    
    return (
        <div className={Styles.container}>
            <div className={`${Styles.left} inverted`}>
                <Link href='/'><a>{Text.header.home}</a></Link>
                <Link href='/contact'><a>{Text.header.contact}</a></Link>
                <Link href='/games'><a>{Text.header.games}</a></Link>
            </div>
            <div className={`${Styles.right} inverted`}>
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}