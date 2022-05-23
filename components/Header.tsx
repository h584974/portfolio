import Link from 'next/link'
import Styles from '../styles/Header.module.css'
import { useAppContext } from '../utils/hooks'

export default function Header() {
    const { toggleTheme } = useAppContext();

    return (
        <div className={Styles.container}>
            <div className={`${Styles.left} inverted`}>
                <Link href='/'><a>HOME</a></Link>
            </div>
            <div className={`${Styles.right} inverted`}>
                <a onClick={toggleTheme}>THEME</a>
            </div>
        </div>
    )
}