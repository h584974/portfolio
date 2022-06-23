import SnakeGame from '../components/content/SnakeGame'
import ViewStyles from '../styles/View.module.css'

export default function Games() {
  return (
    <div id='games'>
        <section className={ViewStyles.section_full}>
        <div className={ViewStyles.content}>
            <SnakeGame />
        </div>
        </section>
    </div>
  )
}