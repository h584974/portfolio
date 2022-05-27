import React, { useEffect, useRef, useState } from 'react'
import Styles from '../styles/Snake.module.css'
import { useAppContext } from '../utils/hooks';
import { parseInput } from '../utils/input';
import { Input, Theme } from '../utils/types';

export default function SnakeGame() {
    const { theme } = useAppContext()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect( () => {
        if (!isPlaying) {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d')
            if (ctx && canvas) {
                ctx.clearRect(0, 0, canvas.width, canvas.height)
                ctx.font = 'bold 50px Courier New'
                ctx.fillStyle = theme === Theme.LIGHT ? 'black' : 'white'
                ctx.fillText('PRESS HERE TO START', 200, 500)
            }
            window.removeEventListener('keydown', move)
        }
        return () => window.removeEventListener('keydown', move)
    }, [theme, isPlaying])

    async function move(event: KeyboardEvent) {
        const input = parseInput(event);
        if (input === Input.QUIT) setIsPlaying(false)
    }

    async function start() {
        window.addEventListener('keydown', move);
        setIsPlaying(true);
    }

    return (
        <div className={Styles.container}>
            <canvas onClick={start} ref={canvasRef} width={1000} height={1000} />
        </div>
    )
}