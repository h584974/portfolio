import { useEffect, useId, useRef, useState } from 'react'
import CStyles from '../../styles/Carousel.module.css'
import IStyles from '../../styles/Icons.module.css'

export default function Carousel({ children, slideshowSeconds }: { children: JSX.Element[], slideshowSeconds?: number }) {
    const [slideWidth, setSlideWidth] = useState<string>('100%')
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const slidesRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (slideshowSeconds) {
            const interval = setInterval(next, slideshowSeconds * 1_000)
            return () => clearInterval(interval)
        }
    }, [])

    useEffect( () => {
        const width = getSlideWithPixels()
        if (slidesRef.current) slidesRef.current.scrollLeft = currentIndex * (width + .75)
    }, [currentIndex])

    useEffect( () => {
        const carousel = containerRef.current
        if (carousel) new ResizeObserver(updateSlideWidth).observe(carousel)
    }, [containerRef.current])

    const mainID = useId()
    const childrenIDs = children.map( (child, index) => {
        const id: string = `${mainID}-${index}`
        return {
            child,
            id
        }
    })

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
        const width = carousel ? window.getComputedStyle(carousel).width : '100%'
        setSlideWidth(width)
        setCurrentIndex(0)
    }

    function getSlideWithPixels() {
        const carousel = containerRef.current
        const width = carousel ? window.getComputedStyle(carousel).width : '0'
        return parseInt(width)
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