import SnakeGame from '../components/SnakeGame'
import ViewStyles from '../styles/View.module.css'

export default function Games() {
    return (
        <div className={ViewStyles.container}>
            <SnakeGame />
        </div>
    )
}