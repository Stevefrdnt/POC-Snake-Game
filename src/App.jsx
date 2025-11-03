import { useState, useEffect, useCallback, useRef } from 'react'
import './App.css'

const GRID_SIZE = 20
const CELL_SIZE = 25
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const INITIAL_FOOD = { x: 15, y: 15 }
const GAME_SPEED = 150

function App() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [gameStatus, setGameStatus] = useState('idle') // idle, playing, paused, gameOver
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore')
    return saved ? parseInt(saved, 10) : 0
  })
  
  const directionRef = useRef(direction)
  const gameLoopRef = useRef(null)

  // Generate random food position
  const generateFood = useCallback((currentSnake) => {
    let newFood
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      }
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  // Check collision with walls or self
  const checkCollision = useCallback((head, body) => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true
    }
    return body.some(segment => segment.x === head.x && segment.y === head.y)
  }, [])

  // Game loop
  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const newHead = {
        x: prevSnake[0].x + directionRef.current.x,
        y: prevSnake[0].y + directionRef.current.y
      }

      // Check collision
      if (checkCollision(newHead, prevSnake)) {
        setGameStatus('gameOver')
        return prevSnake
      }

      const newSnake = [newHead, ...prevSnake]

      // Check if food is eaten
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10
        setScore(newScore)
        if (newScore > highScore) {
          setHighScore(newScore)
          localStorage.setItem('snakeHighScore', newScore.toString())
        }
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
  }, [food, score, highScore, checkCollision, generateFood])

  // Handle keyboard input
  const handleKeyPress = useCallback((e) => {
    if (gameStatus === 'gameOver' || gameStatus === 'idle') return

    const key = e.key
    const newDirection = { ...directionRef.current }

    switch (key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = -1
        }
        break
      case 'ArrowDown':
      case 's':
      case 'S':
        if (directionRef.current.y === 0) {
          newDirection.x = 0
          newDirection.y = 1
        }
        break
      case 'ArrowLeft':
      case 'a':
      case 'A':
        if (directionRef.current.x === 0) {
          newDirection.x = -1
          newDirection.y = 0
        }
        break
      case 'ArrowRight':
      case 'd':
      case 'D':
        if (directionRef.current.x === 0) {
          newDirection.x = 1
          newDirection.y = 0
        }
        break
      case ' ':
        e.preventDefault()
        if (gameStatus === 'playing') {
          setGameStatus('paused')
        } else if (gameStatus === 'paused') {
          setGameStatus('playing')
        }
        break
      default:
        return
    }

    e.preventDefault()
    directionRef.current = newDirection
    setDirection(newDirection)
  }, [gameStatus])

  // Start game
  const startGame = () => {
    setSnake(INITIAL_SNAKE)
    setDirection(INITIAL_DIRECTION)
    directionRef.current = INITIAL_DIRECTION
    setFood(generateFood(INITIAL_SNAKE))
    setScore(0)
    setGameStatus('playing')
  }

  // Setup keyboard listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  // Game loop
  useEffect(() => {
    if (gameStatus === 'playing') {
      gameLoopRef.current = setInterval(moveSnake, GAME_SPEED)
    } else {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current)
      }
    }
  }, [gameStatus, moveSnake])

  return (
    <div className="app">
      <div className="game-container">
        <div className="header">
          <h1 className="title">🐍 Snake Game</h1>
          <div className="scores">
            <div className="score-box">
              <span className="score-label">Score</span>
              <span className="score-value">{score}</span>
            </div>
            <div className="score-box">
              <span className="score-label">High Score</span>
              <span className="score-value">{highScore}</span>
            </div>
          </div>
        </div>

        <div className="game-board" 
             style={{
               width: GRID_SIZE * CELL_SIZE,
               height: GRID_SIZE * CELL_SIZE,
               gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`
             }}>
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE
            const y = Math.floor(index / GRID_SIZE)
            const isSnake = snake.some(segment => segment.x === x && segment.y === y)
            const isHead = snake[0].x === x && snake[0].y === y
            const isFood = food.x === x && food.y === y

            return (
              <div
                key={index}
                className={`cell ${isSnake ? 'snake' : ''} ${isHead ? 'head' : ''} ${isFood ? 'food' : ''}`}
              />
            )
          })}
        </div>

        <div className="controls">
          {gameStatus === 'idle' && (
            <button className="btn btn-primary" onClick={startGame}>
              Start Game
            </button>
          )}
          
          {gameStatus === 'playing' && (
            <button className="btn btn-secondary" onClick={() => setGameStatus('paused')}>
              Pause
            </button>
          )}
          
          {gameStatus === 'paused' && (
            <button className="btn btn-primary" onClick={() => setGameStatus('playing')}>
              Resume
            </button>
          )}
          
          {gameStatus === 'gameOver' && (
            <div className="game-over">
              <h2 className="game-over-text">Game Over!</h2>
              <p className="final-score">Final Score: {score}</p>
              <button className="btn btn-primary" onClick={startGame}>
                Play Again
              </button>
            </div>
          )}
        </div>

        <div className="instructions">
          <p>🎮 Use Arrow Keys or WASD to move</p>
          <p>⏸️ Press Space to pause</p>
        </div>
      </div>
    </div>
  )
}

export default App
