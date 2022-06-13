import { useEffect, useId, useRef, useState } from 'react'
import CStyles from '../../styles/Carousel.module.css'
import IStyles from '../../styles/Icons.module.css'

const DEFAULT_WIDTH = '300px'

export default function Carousel({ children, slideshowSeconds }: { children: JSX.Element[], slideshowSeconds?: number }) {
    const [slideWidth, setSlideWidth] = useState<string>(DEFAULT_WIDTH)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const slidesRef = useRef<HTMLDivElement>(null)

    const mainID = useId()
    const childrenIDs = !children ? [{ child: <></>, id: '0' }] : children.map( (child, index) => {
        const id: string = `${mainID}-${index}`
        return {
            child,
            id
        }
    })

    useEffect(() => {
        if (children && slideshowSeconds) {
            const interval = setInterval(next, slideshowSeconds * 1_000)
            return () => clearInterval(interval)
        }
    }, [])

    useEffect( () => {
        const { id } = childrenIDs[currentIndex]
        const slide = slidesRef.current?.querySelector<HTMLDivElement>(`div[id='${id}'`)
        const offset = slide?.offsetLeft
        offset ? slidesRef.current?.scroll(offset, 0) : slidesRef.current?.scroll(0, 0)
    }, [currentIndex])

    useEffect( () => {
        const carousel = containerRef.current
        if (carousel) new ResizeObserver(updateSlideWidth).observe(carousel)
    }, [containerRef.current])

    function next() {
        setCurrentIndex( index => (index + 1) % children.length )
    }

    function prev() {
        setCurrentIndex( index => {
            let i = index - 1
            if (i < 0) i = children.length - 1
            return i
        } )
    }

    function updateSlideWidth() {
        const carousel = containerRef.current
        const width = carousel ? window.getComputedStyle(carousel).width : DEFAULT_WIDTH
        setSlideWidth(width)
        setCurrentIndex(0)
    }

    if (!children) return <></>

    return (
        <div className={CStyles.container} ref={containerRef}>
            <div className={CStyles.track}>
                <div className={CStyles.slides} ref={slidesRef}>
                    {childrenIDs.map( ({ child, id }) => <div style={{width: slideWidth}} className={CStyles.slide} id={id} key={`slide-${id}`}>{child}</div> )}
                </div>
            </div>
            <div className={CStyles.nav}>
                {childrenIDs.map( ({ id }, index) => {
                    return (
                        <button 
                            className={currentIndex == index ? CStyles.nav_selected : ''} 
                            key={`button-${id}`} 
                            value={index} 
                            onClick={(e: any) => setCurrentIndex(e.target.value as number)}>
                        </button>
                    )
                })}
            </div>
            <div className={`${CStyles.prev}`}>
                <button className={`${IStyles.icon} ${IStyles.left}`} onClick={prev}/>
            </div>
            <div className={CStyles.next}>
                <button className={`${IStyles.icon} ${IStyles.right}`} onClick={next}/>
            </div>
        </div>
    )
}