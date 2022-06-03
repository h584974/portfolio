import Link from 'next/link'
import Styles from '../styles/Header.module.css'
import { useText } from '../utils/hooks'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

const SCROLL_TIMEOUT = 50

export default function Header() {
    const { header } = useText();

    function scrollToHome() {
        setTimeout( () => document.getElementById('homeContainer')?.scrollIntoView(), SCROLL_TIMEOUT)
    }

    function scrollToGames() {
        setTimeout( () => document.getElementById('gamesContainer')?.scrollIntoView(), SCROLL_TIMEOUT)
    }

    function scrollToResume() {
        setTimeout( () => document.getElementById('resumeContainer')?.scrollIntoView(), SCROLL_TIMEOUT)
    }
    
    return (
        <div className={Styles.container}>
            <div className={`${Styles.left} inverted`}>
                <Link href='/'><a onClick={scrollToHome}>{header.home}</a></Link>
                <Link href='/cv'><a onClick={scrollToResume}>{header.cv}</a></Link>
                <a href='#contactContainer'>{header.contact}</a>
                <Link href='/games'><a onClick={scrollToGames}>{header.games}</a></Link>
            </div>
            <div className={`${Styles.right} inverted`}>
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}