import { useEffect, useRef, useState } from 'react'
import Styles from '../styles/Home.module.css'
import { useAppContext, useText, useVaryingInterval } from '../utils/hooks'
import { Theme } from '../utils/types'

export default function Front() {
    const Text = useText()
    const { theme } = useAppContext()
    const descRef = useRef<HTMLHeadingElement>(null)
    const [transparent, setTransparent] = useState<boolean>(false);
    useVaryingInterval(blink, 400, true)

    function blink() {
        const color = theme === Theme.LIGHT ? 'black' : 'yellow'
        const desc: HTMLHeadingElement | null = document.querySelector('h3[id="desc"]')
        const val = desc?.style.getPropertyValue('--bg-after')
        desc?.style.setProperty('--bg-after', val === 'transparent' ? color : 'transparent')
    }

    return (
        <div className={Styles.front}>
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