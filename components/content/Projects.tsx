import Image from 'next/image'
import ViewStyles from '../../styles/View.module.css'
import Carousel from '../views/Carousel'

export default function Projects() {
    return (
        <div className={ViewStyles.grid_6}>
            <div className={ViewStyles.col_span_2}>
                <h2>Projects</h2>
                <p>Something about my projects...</p>
            </div>
            <div className={ViewStyles.col_span_4}>
                <h4>Carousel</h4>
                <div style={{width: '100%', aspectRatio: '16/9'}}>
                    <Carousel slideshowSeconds={10}>
                        <div style={{background: 'blue'}}></div>
                        <div style={{background: 'yellow'}}></div>
                        <div style={{background: 'green'}}></div>
                        <div style={{background: 'red'}}></div>
                    </Carousel>
                </div>
            </div>
        </div>
    )
}