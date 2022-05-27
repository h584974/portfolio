import React, { useEffect, useRef, useState } from 'react'
import Styles from '../styles/Snake.module.css'
import { useAppContext } from '../utils/hooks';
import { parseInput } from '../utils/input';
import { Input, Theme } from '../utils/types';

const GRID_SIZE: number = 40;

export default function SnakeGame() {
    const { theme } = useAppContext()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [speed, setSpeed] = useState<number>(250)
    const [score, setScore] = useState<number>(0)
    const [lastInput, setLastInput] = useState<Input>(Input.RIGHT)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect( () => {
        return () => window.removeEventListener('keydown', move)
    }, [])

    useEffect( () => {
        if (isPlaying) play();
    }, [isPlaying])

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
        }
    }, [theme, isPlaying])

    async function play() {
        if (!isPlaying) return;

        // TODO - Implement game logic and drawing

        setTimeout(play, speed)
    }

    function move(event: KeyboardEvent) {
        const input = parseInput(event);
        if (input === Input.QUIT) quit();
        else setLastInput(input)
    }

    function start() {
        window.addEventListener('keydown', move);
        setIsPlaying(true);
    }

    function quit() {
        window.removeEventListener('keydown', move)
        setIsPlaying(false)
    }

    return (
        <div className={Styles.container}>
            <p>Score: {score}</p>
            <canvas onClick={start} ref={canvasRef} width={1000} height={1000} />
        </div>
    )
}