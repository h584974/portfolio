import { useEffect, useRef, useState } from 'react'
import HomeStyles from '../styles/Home.module.css'
import { useAppContext, useText, useInterval } from '../utils/hooks'

export default function Front() {
    const { front } = useText()
    const { theme } = useAppContext()
    const descRef = useRef<HTMLHeadingElement>(null)
    const frontRef = useRef<HTMLDivElement>(null)
    const [color, setColor] = useState<string>('black')
    useInterval(blink, 400, true)

    useEffect( () => {
        const front = frontRef.current
        const styles = front ? window.getComputedStyle(front) : null
        const col = styles?.color;
        if (col) setColor(col)
    }, [theme])

    function blink() {
        const desc: HTMLHeadingElement | null = document.querySelector('h3[id="desc"]')
        const val = desc?.style.getPropertyValue('--bg-after')
        desc?.style.setProperty('--bg-after', val === 'transparent' ? color : 'transparent')
    }

    return (
        <div className={HomeStyles.front}>
            <h1 className={HomeStyles.name}>{front.name}</h1>
            <h3 
                id='desc'
                className={HomeStyles.description}
                ref={descRef}
                style={{animationTimingFunction: `steps(${front.description.length})`}}
            >
                {front.description}
            </h3>
        </div>
    )
}