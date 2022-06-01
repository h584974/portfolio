import Image from 'next/image'
import Front from '../components/Front'
import SnakeGame from '../components/SnakeGame'
import HomeStyles from '../styles/Home.module.css'
import ViewStyles from '../styles/View.module.css'
import { useText } from '../utils/hooks'

export default function Home() {
    const Text = useText()

    return (
        <div className={HomeStyles.container}>

            <Front />

            <div className={ViewStyles.grid_6}>
                <div className={ViewStyles.col_span_3}>
                    <h2>{Text.intro.title}</h2>
                    <p>{Text.intro.description}</p>
                </div>
                <div className={`${ViewStyles.col_span_3} ${ViewStyles.centered_v} ${ViewStyles.centered_h_mobile}`}>
                    <div className={HomeStyles.portrait_container}>
                    <Image
                        className={`${HomeStyles.portrait} glass-clear`}
                        src='/portrait.png'
                        alt='Portrait'
                        width={100}
                        height={100}
                        layout='responsive'
                        priority
                    />
                    </div>
                </div>
            </div>

            <div className={ViewStyles.grid_6}>
                <div className={`${ViewStyles.start_4} ${ViewStyles.end_7}`}>
                    <h2>{Text.skills.title}</h2>
                    <p>{Text.skills.description}</p>
                    <br />
                    <h4>(Technologies)</h4>
                    <p>List of skills + logos</p>
                </div>
            </div>

            <div className={ViewStyles.break_b} />

            <SnakeGame />
        </div >
    )
}
