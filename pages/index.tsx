import Image from 'next/image'
import Styles from '../styles/Home.module.css'
import { useText } from '../utils/hooks'

export default function Home() {
    const Text = useText()
    
    return (
        <div className={Styles.container}>
            <div className={Styles.content}>
                <h1>Oliver O`Loughlin</h1>
                <p>{Text.description}</p>
            </div>
        </div>
    )
}
