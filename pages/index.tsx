import Image from 'next/image'
import SnakeGame from '../components/Snake'
import HomeStyles from '../styles/Home.module.css'
import ViewStyles from '../styles/View.module.css'
import { useText } from '../utils/hooks'

export default function Home() {
    const Text = useText()
    
    return (
        <div className={HomeStyles.container}>
            <div className={ViewStyles.content}>
                <div className={`${ViewStyles.full} ${ViewStyles.max} ${ViewStyles.center_text} ${ViewStyles.center_content}`}>
                    <div className={HomeStyles.front}>
                    <h1>{Text.front.name}</h1>
                    <h3>{Text.front.description}</h3>
                    </div>
                </div>
            </div>

            <div className={`${ViewStyles.content} ${ViewStyles.left}`}>
                <div className={ViewStyles.big}>
                    <h1>{Text.intro.title}</h1>
                    <p>{Text.intro.description}</p>
                </div>
            </div>

            <div className={ViewStyles.break_s} />

            <div className={ViewStyles.content}>
                <div className={HomeStyles.portrait}>
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

            <div className={ViewStyles.break_s} />

            <div className={`${ViewStyles.content} ${ViewStyles.right}`}>
                <div className={ViewStyles.big}>
                    <div>
                        <h1>{Text.skills.title}</h1>
                        <p>{Text.skills.description}</p>
                    </div>
                    <div className={ViewStyles.break_s}></div>
                    <div>
                        <h3>(Technologies)</h3>
                        <p>(List of technologies + logos)</p>
                    </div>
                </div>
            </div>

            <div className={ViewStyles.break_b} />

            <div className={`${ViewStyles.content} ${ViewStyles.left}`}>
                <div className={`${ViewStyles.medium} ${ViewStyles.half} ${ViewStyles.center_content}`}>
                    <p>(Centered Content Half Size)</p>
                </div>
                <div className={`${ViewStyles.medium} ${ViewStyles.half} ${ViewStyles.center_content}`}>
                    <p>(Centered Content Half Size)</p>
                </div>
            </div>

            <div className={ViewStyles.break_b} />

            <div className={ViewStyles.content}>
                <div className={`${ViewStyles.varying_m} ${ViewStyles.half}`}>
                    <h1>Play some snake</h1>
                    <SnakeGame />
                </div>
            </div>
        </div>
    )
}
