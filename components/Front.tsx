import { useEffect, useRef, useState } from 'react'
import Styles from '../styles/Home.module.css'
import { useAppContext, useText, useInterval } from '../utils/hooks'

export default function Front() {
    const Text = useText()
    const { theme } = useAppContext()
    const descRef = useRef<HTMLHeadingElement>(null)
    const frontRef = useRef<HTMLDivElement>(null)
    const [color, setColor] = useState<string>('black')

    useEffect( () => {
        const front = frontRef.current
        const styles = front ? window.getComputedStyle(front) : null
        const col = styles?.color;
        if (col) setColor(col)
    }, [theme])

    useInterval(blink, 400, true)

    function blink() {
        const desc: HTMLHeadingElement | null = document.querySelector('h3[id="desc"]')
        const val = desc?.style.getPropertyValue('--bg-after')
        desc?.style.setProperty('--bg-after', val === 'transparent' ? color : 'transparent')
    }

    return (
        <div className={Styles.front} ref={frontRef}>
            <h1 className={Styles.name}>{Text.front.name}</h1>
            <h3 
                id='desc'
                className={Styles.description}
                ref={descRef}
                style={{animationTimingFunction: `steps(${Text.front.description.length})`}}
            >
                {Text.front.description}
            </h3>
        </div>
    )
}