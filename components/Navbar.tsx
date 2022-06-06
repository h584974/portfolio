import Link from 'next/link'
import { useState } from 'react'
import Styles from '../styles/Navbar.module.css'
import { useText } from '../utils/hooks'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

const SCROLL_TIMEOUT = 50

export default function Header() {
    const { header } = useText();

    function scrollToGames() {
        setTimeout( () => document.getElementById('gamesContainer')?.scrollIntoView(), SCROLL_TIMEOUT)
    }

    function scrollToResume() {
        setTimeout( () => document.getElementById('resumeContainer')?.scrollIntoView(), SCROLL_TIMEOUT)
    }
    
    return (
        <div className={Styles.container}>
            <div className={`${Styles.left} inverted`}>
                <HomeMenu />
                <a href='#contactContainer'>{header.contact}</a>
                <Link href='/cv'><a onClick={scrollToResume}>{header.cv}</a></Link>
                <Link href='/games'><a onClick={scrollToGames}>{header.games}</a></Link>
            </div>
            <div className={`${Styles.right} inverted`}>
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}

function HomeMenu() {
    const { header } = useText();
    const [open, setOpen] = useState<boolean>(false)

    function scrollToHome() {
        setTimeout( () => document.getElementById('home')?.scrollIntoView(), SCROLL_TIMEOUT)
    }

    function scrollToAbout() {
        setTimeout( () => document.getElementById('about')?.scrollIntoView(), SCROLL_TIMEOUT)
    }
    
    function scrollToProjects() {
        setTimeout( () => document.getElementById('projects')?.scrollIntoView(), SCROLL_TIMEOUT)
    }

    return (
        <div className={`${Styles.dropdown} bg-glass`} onMouseEnter={ () => setOpen(true) } onMouseLeave={ () => setOpen(false) }>
            <Link href='/'><a className={Styles.dropdown_button} onClick={scrollToHome}>{header.home}</a></Link>
            {open &&
                <div className={Styles.dropdown_content}>
                    <Link href='/'><a onClick={scrollToAbout}>About</a></Link>
                    <Link href='/'><a onClick={scrollToProjects}>Projects</a></Link>
                </div>
            }
        </div>
    )
}