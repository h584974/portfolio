import ViewStyles from '../../styles/View.module.css'
import { useText } from '../../utils/hooks'

export default function Skills() {
    const { skills } = useText()
    return (
        <div className={`${ViewStyles.grid_6} mobile-grid`}>
            <div className={`${ViewStyles.start_4} ${ViewStyles.end_7}`}>
                <h2>{skills.title}</h2>
                <p>{skills.description}</p>
                <br />
                <h2>{skills.technologies}</h2>
                <p>List of skills + logos</p>
            </div>
        </div>
    )
}