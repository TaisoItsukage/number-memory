// app/page.tsx
'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import useSound from 'use-sound'
import Input from './components/input'
import Button from './components/button'
enum GameState {
  Setup,
  Display,
  Answer,
  Result
}

export default function Home() {
  const [digits, setDigits] = useState('5')
  const [seconds, setSeconds] = useState('3')
  const [gameState, setGameState] = useState<GameState>(GameState.Setup)
  const [number, setNumber] = useState('')
  const [userAnswer, setUserAnswer] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [audioContextStarted, setAudioContextStarted] = useState(false)

  const [playStart] = useSound('/sounds/start.mp3')
  const [playCorrect] = useSound('/sounds/correct.mp3')
  const [playIncorrect] = useSound('/sounds/incorrect.mp3')

  const answerInputRef = useRef<HTMLInputElement>(null)

  const initializeAudioContext = useCallback(() => {
    if (!audioContextStarted) {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      const audioContext = new AudioContext()
      audioContext.resume().then(() => {
        setAudioContextStarted(true)
      })
    }
  }, [audioContextStarted])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (gameState === GameState.Display && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    } else if (gameState === GameState.Display && timeLeft === 0) {
      setGameState(GameState.Answer)
    }
    return () => clearTimeout(timer)
  }, [gameState, timeLeft])

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Enter') {
        initializeAudioContext()
        handleEnterKey()
      }
    }

    window.addEventListener('keydown', handleGlobalKeyDown)

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
    }
  }, [gameState, digits, seconds, userAnswer, number, initializeAudioContext])

  useEffect(() => {
    if (gameState === GameState.Answer && answerInputRef.current) {
      answerInputRef.current.focus()
    }
  }, [gameState])

  const generateRandomNumber = (length: number): string => {
    return Array.from({ length }, () => Math.floor(Math.random() * 10).toString()).join('')
  }

  const startGame = () => {
    initializeAudioContext()
    const randomNumber = generateRandomNumber(parseInt(digits, 10))
    setNumber(randomNumber)
    setTimeLeft(parseInt(seconds, 10))
    setGameState(GameState.Display)
    playStart()
  }

  const submitAnswer = () => {
    initializeAudioContext()
    setGameState(GameState.Result)
    if (userAnswer === number) {
      playCorrect()
    } else {
      playIncorrect()
    }
  }

  const resetGame = () => {
    initializeAudioContext()
    setGameState(GameState.Setup)
    setUserAnswer('')
  }

  const handleEnterKey = () => {
    switch (gameState) {
      case GameState.Setup:
        startGame()
        break
      case GameState.Answer:
        submitAnswer()
        break
      case GameState.Result:
        resetGame()
        break
      default:
        break
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {gameState === GameState.Setup && (
        <div className="space-y-4 w-full max-w-md">
          <div>
            <label htmlFor="digits" className="block text-sm font-medium text-gray-700 mb-1">
              Number of digits
            </label>
            <Input
              id="digits"
              type="number"
              value={digits}
              onChange={(e) => setDigits(e.target.value)}
              placeholder="Enter number of digits"
            />
          </div>
          <div>
            <label htmlFor="seconds" className="block text-sm font-medium text-gray-700 mb-1">
              Seconds to memorize
            </label>
            <Input
              id="seconds"
              type="number"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              placeholder="Enter seconds to memorize"
            />
          </div>
          <Button onClick={startGame} className="w-full">Start</Button>
        </div>
      )}

      {gameState === GameState.Display && (
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 break-all">
            {number}
          </h1>
          <p className="text-2xl">Time left: {timeLeft} seconds</p>
        </div>
      )}

      {gameState === GameState.Answer && (
        <div className="space-y-4 w-full max-w-md">
          <div>
            <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-1">
              Your answer
            </label>
            <Input
              id="answer"
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer"
              ref={answerInputRef}
            />
          </div>
          <Button onClick={submitAnswer} className="w-full">Submit</Button>
        </div>
      )}

      {gameState === GameState.Result && (
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">
            {userAnswer === number ? 'Correct!' : 'Incorrect!'}
          </h2>
          <p className="break-all">The number was: {number}</p>
          <p className="break-all">Your answer: {userAnswer}</p>
          <Button onClick={resetGame} className="w-full">Play Again</Button>
        </div>
      )}
    </div>
  )
}