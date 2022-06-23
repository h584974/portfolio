import { useEffect, useRef, ButtonHTMLAttributes, useState } from 'react';
import Styles from '../../styles/Button.module.css'

type RippleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    rippleColor?: string,
    rippleSpeed?: string;
    rippleStrength?: number;
}

type NeonButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

function doRippleEffect(event: any) {
    const btn: HTMLButtonElement = event.target
    const x = event.offsetX
    const y = event.offsetY
    const style = btn.style
    style.setProperty('--x', x + 'px')
    style.setProperty('--y', y + 'px')
    btn.classList.add(Styles.ripple_effect)
    btn.addEventListener('animationend', () => btn.classList.remove(Styles.ripple_effect), { once: true } )
}

export function RippleButton({ children, rippleColor, rippleSpeed, rippleStrength, className, ...rest }: RippleButtonProps) {
    const btnRef = useRef<HTMLButtonElement>(null)

    useEffect(() => {
        const btn = btnRef.current
        if (btn) {
            const style = btn.style
            if (rippleColor) style.setProperty('--ripple-color', rippleColor)
            if (rippleSpeed) style.setProperty('--animation-duration', rippleSpeed)
            if (rippleStrength) style.setProperty('--ripple-strength', `${rippleStrength}`)
            btn.addEventListener('pointerdown', doRippleEffect)
            return () => btnRef.current?.removeEventListener('pointerdown', doRippleEffect)
        }
    }, [])

    return (
        <button 
            className={`${Styles.ripple} ${className}`}
            ref={btnRef}
            {...rest}
        >
            {children}
        </button>
    )
}

export function NeonButton({children, className, ...rest}: NeonButtonProps) {
    return (
        <button
            className={`${Styles.neon} ${className}`}
            {...rest}
        >
            {children}
        </button>
    )
}