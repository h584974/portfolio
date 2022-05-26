import Image from 'next/image'
import Styles from '../styles/Home.module.css'
import { useText } from '../utils/hooks'

export default function Home() {
    const Text = useText()
    
    return (
        <div className={Styles.container}>
            <div className={Styles.content}>
                <div className={`${Styles.full} ${Styles.center_text} ${Styles.center_content}`}>
                    <div className={Styles.front}>
                    <h1>{Text.front.name}</h1>
                    <h3>{Text.front.description}</h3>
                    </div>
                </div>
            </div>

            <div className={`${Styles.content} ${Styles.left}`}>
                <div className={Styles.big}>
                    <h1>{Text.intro.title}</h1>
                    <p>{Text.intro.description}</p>
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
                        priority
                    />
                </div>
            </div>

            <div className={`${Styles.content} ${Styles.right}`}>
                <div className={Styles.big}>
                    <h1>{Text.skills.title}</h1>
                    <p>{Text.skills.description}</p>
                </div>
            </div>
        </div>
    )
}
