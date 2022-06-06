import Styles from '../styles/Resume.module.css'
import { useCV } from '../utils/fetchers'

export default function Resume() {
    const { cvSrc, error } = useCV()

    return (
        <div id='cv' className={Styles.container}>
            <embed type='application/pdf' src={cvSrc}></embed>
        </div>
    )
}