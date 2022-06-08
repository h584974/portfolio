import ViewStyles from '../styles/View.module.css'

export default function Projects() {
    return (
        <div className={ViewStyles.grid_6}>
            <div className={ViewStyles.col_span_2}>
                <h2>Projects</h2>
                <p>Something about my projects...</p>
            </div>
            <div className={ViewStyles.col_span_2}>
                <h4>Picture</h4>
            </div>
            <div className={ViewStyles.col_span_2}>
                <h4>Carousel?</h4>
            </div>
        </div>
    )
}