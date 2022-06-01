import { useEffect, useRef, useState } from 'react'
import FrontStyles from '../styles/Home.module.css'
import ViewStyles from '../styles/View.module.css'
import { useAppContext, useText, useInterval } from '../utils/hooks'

export default function Front() {
    const Text = useText()
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
        <div className={ViewStyles.grid_6}>
                <div ref={frontRef} className={`
                    ${ViewStyles.col_span_6} 
                    ${ViewStyles.centered_h} 
                    ${ViewStyles.centered_v} 
                    ${ViewStyles.full} 
                    ${ViewStyles.centered_text} 
                    ${FrontStyles.front}
                    `}>
                    <h1 className={FrontStyles.name}>{Text.front.name}</h1>
                    <h3 
                        id='desc'
                        className={FrontStyles.description}
                        ref={descRef}
                        style={{animationTimingFunction: `steps(${Text.front.description.length})`}}
                    >
                        {Text.front.description}
                    </h3>
                </div>
        </div>
    )
}