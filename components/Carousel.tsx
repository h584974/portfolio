import { useId } from 'react'
import CStyles from '../styles/Carousel.module.css'
import IStyles from '../styles/Icons.module.css'

export default function Carousel({ children }: { children: JSX.Element[] }) {
    const id = useId()

    if (!children) return <></>

    return (
        <div className={CStyles.carousel}>
            <button className={`${CStyles.button} ${IStyles.icon} ${IStyles.left}`} style={{backgroundColor: 'transparent'}}></button>
            <div className={CStyles.track_container}>
                <ul className={CStyles.track}>
                    {children.map( (child, index) => <li key={`${id}-${index}`} className={CStyles.slide}>{child}</li> )}
                </ul>
            </div>
            <button className={`${CStyles.button} ${IStyles.icon} ${IStyles.right}`} style={{backgroundColor: 'transparent'}}></button>
        </div>
    )
}