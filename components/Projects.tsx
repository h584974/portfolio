import Image from 'next/image'
import ViewStyles from '../styles/View.module.css'
import Carousel from './Carousel'

export default function Projects() {
    return (
        <div className={ViewStyles.grid_6}>
            <div className={ViewStyles.col_span_2}>
                <h2>Projects</h2>
                <p>Something about my projects...</p>
            </div>
            <div className={ViewStyles.col_span_4}>
                <h4>Carousel</h4>
                
            </div>
        </div>
    )
}