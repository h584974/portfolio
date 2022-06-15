import Image from 'next/image'
import HomeStyles from '../../styles/Home.module.css'
import ViewStyles from '../../styles/View.module.css'
import { useText } from '../../utils/hooks'

export default function AboutMe() {
    const { about } = useText()
    return (
        <div className={`${ViewStyles.grid_6} mobile-grid`}>
            <div className={ViewStyles.col_span_3}>
                <h2>{about.title}</h2>
                <p>{about.description}</p>
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
    )
}