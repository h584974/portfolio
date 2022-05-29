import React, { useEffect, useRef, useState } from 'react'
import Styles from '../styles/Snake.module.css'
import { useAppContext, useVaryingInterval } from '../utils/hooks';
import { Direction, Food, Input, Point2D, Snake, Theme } from '../utils/types';

// Constants
const GRID_SIZE: number = 40;
const SNAKE_START: Snake = [{x: 3, y: GRID_SIZE / 2}, {x: 2, y: GRID_SIZE / 2}, {x: 1, y: GRID_SIZE / 2}]
const DIRECTION_START: Direction = Direction.RIGHT;
const SPEED_START: number = 250
const SPEED_LIMIT = 50;
const MAX_FOOD = 20
const FOOD_DROP_RATE = 0.1

// Snake Game component
export default function SnakeGame() {
    const { theme } = useAppContext()
    const [trigger, setTrigger] = useState<{ message: string }>({ message: 'init' })
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [speedMS, setSpeedMS] = useState<number>(SPEED_START)
    const [score, setScore] = useState<number>(0)
    const [highScore, setHighScore] = useState<number>(0)
    const [snake, setSnake] = useState<Snake>(SNAKE_START)
    const [food, setFood] = useState<Food>([])
    const [direction, setDirection] = useState<Direction>(DIRECTION_START)
    const { active, updateInterval, startInterval, stopInterval } = useVaryingInterval(play, SPEED_START)
    const canvasRef = useRef<HTMLCanvasElement>(null)

    // Remove event listener upon dismount
    useEffect( () => {
        return () => window.removeEventListener('keydown', inputAction)
    }, [])

    // Draw updated objects
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

            if (gameOver) {
                fitFillText('GAME OVER', ctx, size)
                return
            }

            if (!active) {
                fitFillText('PRESS HERE TO START', ctx, size)
                return
            }

            ctx.fillStyle = 'red'
            food.forEach( ({x, y}) => ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize) )

            ctx.fillStyle = theme === Theme.LIGHT ? 'black' : 'white'
            snake.forEach( ({x, y}) => ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize) )
        }
    }, [snake, gameOver, theme, active])

    function play() {
        if (gameOver) {
            stopInterval()
            return
        }

        updateFood()
        updateSnake()
    }

    function updateFood() {
        const doDrop = Math.random() <= FOOD_DROP_RATE;
        if (doDrop && food.length < MAX_FOOD) {
            const x = Math.floor(Math.random() * GRID_SIZE)
            const y = Math.floor(Math.random() * GRID_SIZE)
            setFood(food => [{x,y}, ...food])
        }
    }

    function updateSnake() {
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
            setScore( score => {
                const newScore = score + 1
                if (newScore > highScore) setHighScore(newScore)
                return newScore
            } )
            setSpeedMS( speed => Math.max(speed - 2, SPEED_LIMIT) )
        }
        else {
            setSnake([newHead, ...(snake.slice(0, snake.length - 1))])
        }
    }

    function inputAction(event: KeyboardEvent) {
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

    function start() {
        if (!active || gameOver) {
            reset()
            startInterval()
            window.addEventListener('keydown', inputAction)
        }
    }

    function quit() {
        stopInterval()
        reset()
        window.removeEventListener('keydown', inputAction)
    }

    function reset() {
        setGameOver(false)
        setSpeedMS(SPEED_START)
        setSnake(SNAKE_START)
        setScore(0)
        setFood([])
        setDirection(DIRECTION_START)
        updateInterval(SPEED_START)
    }

    return (
        <div className={Styles.container}>
            <span className={Styles.scoreboard}>
                <p>Score: {score}</p>
                <p>High Score: {highScore}</p>
            </span>
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