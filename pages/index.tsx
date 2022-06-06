import AboutMe from '../components/AboutMe'
import Front from '../components/Front'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import HomeStyles from '../styles/Home.module.css'
import ViewStyles from '../styles/View.module.css'
import { useText } from '../utils/hooks'

export default function Home() {
    const Text = useText()

    return (
        <div id='home' className={HomeStyles.container}>
            <div className={`${ViewStyles.section_full} ${ViewStyles.centered}`}>
                <Front />
            </div>

            <div id='about' className={`${ViewStyles.section_full} ${ViewStyles.centered_v}`}>
                <AboutMe />
                <Skills />
            </div >

            <div id='projects' className={`${ViewStyles.section_full} ${ViewStyles.centered_v}`}>
                <Projects />
            </div>
        </div>
    )
}
