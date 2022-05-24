import Image from 'next/image'
import Styles from '../styles/Home.module.css'
import { useText } from '../utils/hooks'

export default function Home() {
    const Text = useText()
    
    return (
        <div className={Styles.container}>
            <div className={Styles.content}>
                <div className={Styles.big}>
                    <h1>{Text.intro.title}</h1>
                    <p>{Text.intro.description}</p>
                </div>
                <div className={`${Styles.small} ${Styles.center}`}>
                    <p></p>
                </div>
            </div>

            <div className={Styles.content}>
                <div className={Styles.portrait}>
                    <Image
                        src='/portrait.png'
                        alt='Portrait'
                        width={100}
                        height={100}
                        layout='responsive'
                    />
                </div>
            </div>

            <div className={Styles.content}>
                <div className={`${Styles.small} ${Styles.center}`}>
                    <p></p>
                </div>
                <div className={Styles.big}>
                    <h1>{Text.intro.title}</h1>
                    <p>{Text.intro.description}</p>
                </div>
            </div>
        </div>
    )
}
