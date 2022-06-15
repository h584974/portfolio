import { useEffect, useRef } from 'react'
import HomeStyles from '../../styles/Home.module.css'
import { useText } from '../../utils/hooks'

export default function Front() {
    const { front } = useText()
    const descRef = useRef<HTMLHeadingElement>(null)
    const frontRef = useRef<HTMLDivElement>(null)

    useEffect( () => {
        const interval = setInterval(blink, 400)
        return () => clearInterval(interval)
    }, [])

    function blink() {
        const frontElem = frontRef.current
        const styles = frontElem ? window.getComputedStyle(frontElem) : null
        const color = styles?.color ?? 'black';
        const val = descRef.current?.style.getPropertyValue('--bg-after')
        descRef.current?.style.setProperty('--bg-after', val === 'transparent' ? color : 'transparent')
    }

    return (
        <div className={HomeStyles.front} ref={frontRef}>
            <h1 className={HomeStyles.name}>{front.name}</h1>
            <h3 
                className={HomeStyles.description}
                ref={descRef}
                style={{animationTimingFunction: `steps(${front.description.length})`}}
            >
                {front.description}
            </h3>
        </div>
    )
}