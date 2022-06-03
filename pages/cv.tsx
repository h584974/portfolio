import Styles from '../styles/Resume.module.css'

export default function Resume() {
    return (
        <div id='resumeContainer' className={Styles.container}>
            <embed type='application/pdf' src='/Main Report.pdf'></embed>
        </div>
    )
}