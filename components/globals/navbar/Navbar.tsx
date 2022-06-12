import Link from 'next/link'
import { useState } from 'react'
import Styles from '../../../styles/Navbar.module.css'
import { useText } from '../../../utils/hooks'
import LanguageToggle from './LanguageToggle'
import ThemeToggle from './ThemeToggle'

const SCROLL_TIMEOUT = 50

export default function Header() {
    const { navbar } = useText();
    
    return (
        <div className={Styles.container}>
            <div className={`${Styles.left} inverted`}>
                <HomeMenu />
                <a href='#contact'>{navbar.contact}</a>
                <Link href='/cv#cv'><a>{navbar.cv}</a></Link>
                <Link href='/games#games'><a>{navbar.games}</a></Link>
            </div>
            <div className={`${Styles.right} inverted`}>
                <LanguageToggle />
                <ThemeToggle />
            </div>
        </div>
    )
}

function HomeMenu() {
    const { navbar } = useText();
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className={`${Styles.dropdown} bg-glass`} onMouseEnter={ () => setOpen(true) } onMouseLeave={ () => setOpen(false) }>
            <Link href='/#home'><a className={Styles.dropdown_button}>{navbar.home}</a></Link>
            {open &&
                <div className={Styles.dropdown_content}>
                    <Link href='/#about'><a>{navbar.about}</a></Link>
                    <Link href='/#projects'><a>{navbar.projects}</a></Link>
                </div>
            }
        </div>
    )
}