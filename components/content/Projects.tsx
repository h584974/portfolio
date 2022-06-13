import Image from 'next/image'
import ViewStyles from '../../styles/View.module.css'
import { useText } from '../../utils/hooks'
import Carousel from '../views/Carousel'

export default function Projects() {
    const { projects } = useText()
    return (
        <>
        <div className={ViewStyles.grid_6}>
            <h1>{projects.title}</h1>
        </div>
        <div className={ViewStyles.grid_6}>
            <div className={ViewStyles.col_span_2}>
                <h3>{projects.project1.title}</h3>
                <p>{projects.project1.description}</p>
            </div>
            <div className={ViewStyles.col_span_4}>
                <div style={{width: '100%', aspectRatio: '16/9'}}>
                    <Carousel slideshowSeconds={10}>
                        <img src='/heqed/1.png' alt='HEQED House front page'/>
                        <img src='/heqed/2.png' alt='Document viewing page'/>
                        <img src='/heqed/3.png' alt='Virtual application'/>
                        <img src='/heqed/4.png' alt='Admin Page'/>
                    </Carousel>
                </div>
            </div>
        </div>
        </>
    )
}