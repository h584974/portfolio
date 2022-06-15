import AboutMe from '../components/content/AboutMe'
import Front from '../components/content/Front'
import Projects from '../components/content/Projects'
import Skills from '../components/content/Skills'
import HomeStyles from '../styles/Home.module.css'
import ViewStyles from '../styles/View.module.css'

export default function Home() {
    return (
        <div id='home' className={HomeStyles.container}>
            <div className={ViewStyles.section_full}>
                <div className={ViewStyles.content}>
                <Front />
                </div>
            </div>

            <div id='about' className={ViewStyles.section_full}>
                <div className={ViewStyles.content}>
                <AboutMe />
                <Skills />
                </div>
            </div >

            <div id='projects' className={ViewStyles.section_full}>
                <div className={ViewStyles.content}>
                <Projects />
                </div>
            </div>
        </div>
    )
}
