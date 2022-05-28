import React, { useEffect, useRef, useState } from 'react'
import Styles from '../styles/Snake.module.css'
import { useAppContext } from '../utils/hooks';
import { Direction, Food, Input, Point2D, Snake, Theme } from '../utils/types';

const GRID_SIZE: number = 40;
const SNAKE_START: Snake = [{x: 3, y: GRID_SIZE / 2}, {x: 2, y: GRID_SIZE / 2}, {x: 1, y: GRID_SIZE / 2}]
const DIRECTION_START: Direction = Direction.RIGHT;
const SPEED_START: number = 250
const MAX_FOOD = 20
const FOOD_DROP_RATE = 0.1

export default function SnakeGame() {
    const { theme } = useAppContext()
    const [trigger, setTrigger] = useState<Object>({message: 'Initial'})
    const [playing, setPlaying] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [speedMS, setSpeedMS] = useState<number>(SPEED_START)
    const [score, setScore] = useState<number>(0)
    const [snake, setSnake] = useState<Snake>(SNAKE_START)
    const [food, setFood] = useState<Food>([])
    const [direction, setDirection] = useState<Direction>(DIRECTION_START)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect( () => {
        const interval = setInterval( () => setTrigger({message: 'ping'}) , speedMS)
        return () => {
            clearInterval(interval)
            window.removeEventListener('keydown', inputAction)
        }
    }, [])

    useEffect( () => {
        if (playing) {
            updateSnake()
            dropFood()
        }
    }, [trigger])

    useEffect( () => {
        playing ? window.addEventListener('keydown', inputAction) : window.removeEventListener('keydown', inputAction);
    }, [playing])

    useEffect( () => {
        function fitFillText(text: string, ctx: CanvasRenderingContext2D, size: number) {
            const maxChars = 20
            const fontSize = size / maxChars
            const x = (maxChars - text.length) / 2 * fontSize
            const y = size / 2
            ctx.font = `bold ${fontSize}px Courier New`
            ctx.fillText(text, x, y)
        }

        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx && canvas) {
            const size = canvas.width
            const tileSize = size / GRID_SIZE
            ctx.clearRect(0, 0, size, size)
            ctx.fillStyle = theme === Theme.LIGHT ? 'black' : 'white'
            if (!playing) {
                fitFillText('PRESS HERE TO START', ctx, size)
                return
            }

            if (gameOver) {
                const text = ''
                fitFillText('GAME OVER', ctx, size)
                return
            }

            ctx.fillStyle = 'yellow'
            food.forEach( ({x, y}) => ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize) )

            ctx.fillStyle = theme === Theme.LIGHT ? 'black' : 'white'
            snake.forEach( ({x, y}) => ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize) )
        }
    }, [snake, gameOver, theme, playing])

    async function dropFood() {
        const doDrop = Math.random() <= FOOD_DROP_RATE;
        if (doDrop && food.length < MAX_FOOD) {
            const x = Math.floor(Math.random() * GRID_SIZE)
            const y = Math.floor(Math.random() * GRID_SIZE)
            setFood(food => [{x,y}, ...food])
        }
    }

    async function updateSnake() {
        const head = snake[0]
        let newHead: Point2D = {x: 0, y: 0};
        switch (direction) {
            case Direction.UP: 
                newHead = {x: head.x, y: head.y - 1}
                break

            case Direction.DOWN:
                newHead = {x: head.x, y: head.y + 1}
                break

            case Direction.LEFT:
                newHead = {x: head.x - 1, y: head.y}
                break

            case Direction.RIGHT:
                newHead = {x: head.x + 1, y: head.y}
                break
        }

        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
            setGameOver(true)
            return
        }

        if (snake.some( part => part.x === newHead.x && part.y === newHead.y )) {
            setGameOver(true)
            return
        }

        if (food.some( part => part.x === newHead.x && part.y === newHead.y )) {
            setSnake([newHead, ...snake])
            setScore( score => score + 1 )
        }
        else {
            setSnake([newHead, ...(snake.slice(0, snake.length - 1))])
        }
    }

    async function inputAction(event: KeyboardEvent) {
        const input = parseInput(event);
        switch (input) {
            case Input.QUIT:
                quit()
                break
            
            case Input.UP:
                setDirection(Direction.UP)
                break

            case Input.DOWN:
                setDirection(Direction.DOWN)
                break

            case Input.LEFT:
                setDirection(Direction.LEFT)
                break

            case Input.RIGHT:
                setDirection(Direction.RIGHT)
                break
        }
    }

    async function start() {
        setPlaying(true);
        reset()
    }

    async function quit() {
        setPlaying(false)
        reset()
    }

    async function reset() {
        setGameOver(false)
        setSpeedMS(SPEED_START)
        setSnake(SNAKE_START)
        setScore(0)
        setFood([])
        setDirection(DIRECTION_START)
    }

    return (
        <div className={Styles.container}>
            <p>Score: {score}</p>
            <canvas onClick={start} ref={canvasRef} width={1000} height={1000} />
        </div>
    )
}

function parseInput(event: KeyboardEvent): Input {
    event.preventDefault()
    switch (event.key) {
        case 'ArrowUp':
        case 'w'      :
            return Input.UP

        case 'ArrowDown':
        case 's'        :
            return Input.DOWN

        case 'ArrowLeft':
        case 'a'        :
            return Input.LEFT

        case 'ArrowRight':
        case 'd'         :
            return Input.RIGHT

        case 'Escape':
            return Input.QUIT

        default: return Input.UNDEFINED
    }
}