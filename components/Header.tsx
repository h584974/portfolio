import Link from 'next/link'
import Styles from '../styles/Header.module.css'
import { useText } from '../utils/hooks'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

export default function Header() {
    const Text = useText();

    function scrollToHome() {
        setTimeout( () => document.getElementById('homeContainer')?.scrollIntoView(), 50)
    }

    function scrollToGames() {
        setTimeout( () => document.getElementById('gamesContainer')?.scrollIntoView(), 50)
    }
    
    return (
        <div className={Styles.container}>
            <div className={`${Styles.left} inverted`}>
                <Link href='/'><a onClick={scrollToHome}>{Text.header.home}</a></Link>
                <a href='#contactContainer'>{Text.header.contact}</a>
                <Link href='/games'><a onClick={scrollToGames}>{Text.header.games}</a></Link>
            </div>
            <div className={`${Styles.right} inverted`}>
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}