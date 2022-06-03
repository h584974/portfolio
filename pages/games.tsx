import SnakeGame from '../components/SnakeGame'
import ViewStyles from '../styles/View.module.css'

export default function Games() {
    return (
        <div id='gamesContainer' className={ViewStyles.container}>
            <div className={`${ViewStyles.section_full} ${ViewStyles.centered_v}`}>
                <SnakeGame />
            </div>
        </div>
    )
}