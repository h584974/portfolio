import React, { useEffect, useRef, useState } from 'react'
import { onCollectionChanged, setDocument, updateDocument } from '../../services/firebase'
import SnakeStyles from '../../styles/Snake.module.css'
import ViewStyles from '../../styles/View.module.css'
import { useAppContext, useInterval, useText } from '../../utils/hooks'
import { Direction, Food, Input, Point2D, Snake, Theme } from '../../utils/types'
import { updateUsername } from '../../utils/user'
import { RippleButton } from '../../nextjs_modules/index'

// Constants
const GRID_SIZE = 40
const SNAKE_START: Snake = [{x: 3, y: GRID_SIZE / 2}, {x: 2, y: GRID_SIZE / 2}, {x: 1, y: GRID_SIZE / 2}]
const DIRECTION_START = Direction.RIGHT
const SPEED_START = 250
const SPEED_LIMIT = 50
const SPEED_ACCELERATION = 2
const MAX_FOOD = 20
const FOOD_DROP_RATE = 0.1

// Snake Game component
export default function SnakeGame() {
    const Text = useText()
    const { theme, user } = useAppContext()
    const [leaderboard, setLeaderboard] = useState<any[]>([])
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [score, setScore] = useState<number>(0)
    const [snake, setSnake] = useState<Snake>(SNAKE_START)
    const [food, setFood] = useState<Food>([])
    const [direction, setDirection] = useState<Direction>(DIRECTION_START)
    const { active, updateInterval, startInterval, stopInterval } = useInterval(play, SPEED_START)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)

    useEffect( () => {
        const unsub = onCollectionChanged('users', dataArray => {
            const leaderboard = dataArray.sort( (user1, user2) => user2.snakeHighScore - user1.snakeHighScore )
            setLeaderboard(leaderboard)
        })

        return () => {
            window.removeEventListener('keydown', inputAction)
            unsub()
        }
    }, [])

    useEffect( () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (ctx && canvas) {
            const size = canvas.width
            const tileSize = size / GRID_SIZE
            ctx.clearRect(0, 0, size, size)
            ctx.fillStyle = theme === Theme.LIGHT ? 'black' : 'white'

            if (gameOver) {
                fitFillText(Text.snake.gameOver, ctx, size)
                return
            }

            if (!active) {
                fitFillText(Text.snake.startGame, ctx, size)
                return
            }

            ctx.fillStyle = 'red'
            food.forEach( ({x, y}) => ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize) )

            ctx.fillStyle = theme === Theme.LIGHT ? 'black' : 'white'
            snake.forEach( ({x, y}) => ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize) )
        }
    }, [snake, gameOver, theme, active, Text])

    function play() {
        if (gameOver) {
            stopInterval()
            return
        }

        updateFood()
        updateSnake()
    }

    function updateFood() {
        const doDrop = Math.random() <= FOOD_DROP_RATE
        if (doDrop && food.length < MAX_FOOD) {
            const x = Math.floor(Math.random() * GRID_SIZE)
            const y = Math.floor(Math.random() * GRID_SIZE)
            setFood(food => [{x,y}, ...food])
        }
    }

    function updateSnake() {
        const head = snake[0]
        let newHead: Point2D = {x: 0, y: 0}
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
            setFood( food.filter( ({x, y}) => x !== newHead.x || y !== newHead.y ) )
            setScore( score => {
                const newScore = score + 1
                if (user && newScore > (user.snakeHighScore ?? 0)) {
                    if (user.snakeHighScore || user.snakeHighScore === 0) updateDocument('users', user.uid, { snakeHighScore: newScore })
                    else setDocument('users', user.uid, {
                        username: 'anonymous',
                        snakeHighScore: newScore
                    })
                }
                return newScore
            } )
            updateInterval( interval => Math.max(interval - SPEED_ACCELERATION, SPEED_LIMIT) )
        }
        else {
            setSnake([newHead, ...(snake.slice(0, snake.length - 1))])
        }
    }

    function inputAction(event: KeyboardEvent) {
        const input = parseInput(event)
        switch (input) {
            case Input.QUIT:
                quit()
                break
            
            case Input.UP:
                setDirection( direction => direction === Direction.DOWN ? direction : Direction.UP)
                break

            case Input.DOWN:
                setDirection( direction => direction === Direction.UP ? direction : Direction.DOWN)
                break

            case Input.LEFT:
                setDirection( direction => direction === Direction.RIGHT ? direction : Direction.LEFT)
                break

            case Input.RIGHT:
                setDirection( direction => direction === Direction.LEFT ? direction : Direction.RIGHT)
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
        setSnake(SNAKE_START)
        setScore(0)
        setFood([])
        setDirection(DIRECTION_START)
        updateInterval(SPEED_START)
    }

    function submitUsername(e: any) {
        e.preventDefault()
        const username = usernameRef.current?.value
        if (user && username) updateUsername(username, user.uid)
    }

    return (
        <div className={`${ViewStyles.grid_6} ${SnakeStyles.container} mobile-grid`}>
            <div className={ViewStyles.col_span_3}>
                <span className={SnakeStyles.score_banner}>
                    <p>{Text.snake.score}: {score}</p>
                    <p>{Text.snake.highScore}: {user?.snakeHighScore ?? 0}</p>
                </span>
                <canvas onClick={start} ref={canvasRef} width={1000} height={1000} />
            </div>
            <div className={`${ViewStyles.col_span_2} ${SnakeStyles.leaderboard}`}>
                <ol>
                    <li>
                        <form onSubmit={submitUsername}>
                            <input
                                type='text'
                                placeholder={Text.snake.usernamePlaceholder}
                                ref={usernameRef}
                                maxLength={10}
                                minLength={1}
                                required
                            />
                            <RippleButton type="submit">{Text.snake.usernameSubmit}</RippleButton>
                        </form>
                    </li>
                    <br />
                    <li><strong>{Text.snake.leaderboard}:</strong></li>
                    {leaderboard.map( ({ username, snakeHighScore }, index) => {
                        return (
                            <li className={ViewStyles.grid_2} key={index}>
                                <p>{username}</p>
                                <p>{snakeHighScore}</p>
                            </li>
                        )
                    } )}
                </ol>
            </div>
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

function fitFillText(text: string, ctx: CanvasRenderingContext2D, size: number) {
    const maxChars = 20
    const fontSize = size / maxChars
    const x = (maxChars - text.length) / 2 * fontSize + (9 * text.length)
    const y = size / 2
    ctx.font = `bold ${fontSize}px Courier New`
    ctx.fillText(text, x, y)
}