import { useEffect, useId, useRef, useState } from 'react'
import CStyles from '../../styles/Carousel.module.css'
import IStyles from '../../styles/Icons.module.css'

type ChildRef = {
    id: string,
    child: JSX.Element,
}

const DEFAULT_WIDTH = '300px'

export default function Carousel({ children, slideshowSeconds, followParent = true }: { children: JSX.Element | JSX.Element[], slideshowSeconds?: number, followParent?: boolean }) {
    const carouselID = useId()
    const [width, setWidth] = useState<string>(DEFAULT_WIDTH)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const carouselRef = useRef<HTMLDivElement>(null)
    const slidesRef = useRef<HTMLDivElement>(null)

    const childrenArr: JSX.Element[] = !children ? [] : !(children as JSX.Element).type ? children as JSX.Element[] : [(children as JSX.Element)]
    const childRefs: ChildRef[] = childrenArr.map( (child, index) => {
        const id: string = `${carouselID}-${index}`
        return {
            child,
            id
        }
    })

    useEffect(() => {
        const carousel = carouselRef.current
        if (carousel) {
            new ResizeObserver(() => {
                const parent = carouselRef.current?.parentElement
                const width = parent ? window.getComputedStyle(parent).width : DEFAULT_WIDTH
                setWidth(width)
                setCurrentIndex(0)
            })
            .observe(carousel)
        }

        if (slideshowSeconds) {
            const interval = setInterval(next, slideshowSeconds * 1_000)
            return () => clearInterval(interval)
        }
    }, [])

    useEffect( () => {
        const { id } = childRefs[currentIndex]
        const slide = slidesRef.current?.querySelector<HTMLDivElement>(`div[id='${id}'`)
        const offset = slide?.offsetLeft
        offset ? slidesRef.current?.scroll(offset, 0) : slidesRef.current?.scroll(0, 0)
    }, [currentIndex])

    function next() {
        setCurrentIndex( index => (index + 1) % childrenArr.length )
    }

    function prev() {
        setCurrentIndex( index => {
            let i = index - 1
            if (i < 0) i = childrenArr.length - 1
            return i
        })
    }

    if (!children) return <></>

    return (
        <div className={CStyles.container} style={{ width }} ref={carouselRef}>
            <div className={CStyles.track}>
                <div className={CStyles.slides} ref={slidesRef}>
                    {childRefs.map( ({ child, id }) => <div style={{ width }} className={CStyles.slide} id={id} key={`slide-${id}`}>{child}</div> )}
                </div>
            </div>
            <div className={CStyles.nav}>
                {childRefs.map( ({ id }, index) => {
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
            <div className={CStyles.prev}>
                <button className={`${IStyles.icon} ${IStyles.left}`} onClick={prev}/>
            </div>
            <div className={CStyles.next}>
                <button className={`${IStyles.icon} ${IStyles.right}`} onClick={next}/>
            </div>
        </div>
    )
}