import Styles from '../styles/CV.module.css'
import { useCV } from '../utils/fetchers'

export default function CV() {
    const { cvSrc, error } = useCV()

    return (
        <div id='cv' className={Styles.container}>
            <embed type='application/pdf' src={cvSrc}></embed>
        </div>
    )
}