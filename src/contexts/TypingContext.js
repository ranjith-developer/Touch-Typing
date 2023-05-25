import React, {createContext, useCallback, useEffect, useState} from 'react'

export const TypingContext = createContext()

const TypingContextProvider = (props) => {
    const [exercise, setExercise] = useState('')
    const [userInput, setUserInput] = useState('')
    const [accuracy, setAccuracy] = useState(0)
    const [completed, setCompleted] = useState(false)
    const [startTime, setStartTime] = useState(null)
    const [totalKeysPressed, setTotalKeysPressed] = useState(0)
    const [timeRemaining, setTimeRemaining] = useState(300)

    useEffect(() => {
        generateExercise()
    }, [])

    const calculateAccuracy = useCallback(() => {
        const accuracyPercentage = (exercise.length / userInput.length) * 100
        setAccuracy(accuracyPercentage.toFixed(2))
    }, [exercise.length, userInput.length])

    useEffect(() => {
        let timer;
        if(startTime && !completed) {
            timer = setInterval(() => {
                setTimeRemaining(prevTime => prevTime - 1)
            }, 1000)
        }

        if(timeRemaining === 0) {
            clearInterval(timer)
            setCompleted(true)
            calculateAccuracy()
        }
        return () => {
            clearInterval(timer)
        }
    }, [startTime, completed, timeRemaining, calculateAccuracy, setTotalKeysPressed, userInput.length])

    const generateExercise = () => {
        const keys = 'asdfjkl;'.split('')
        let randomExercise = ''
        for (let i=0; i<8; i++) {
            const randomIndex = Math.floor(Math.random() * keys.length)
            randomExercise += keys[randomIndex]
        }
        setExercise(randomExercise)
    }

    const handleInputChange = (e) => {
        const input = e.target.value
        setUserInput(input)

        if(!startTime) {
            setStartTime(Date.now())
        }


        if(input === exercise) {
            // setCompleted(true)
            calculateAccuracy()
            generateExercise()
            setUserInput('')
            setTotalKeysPressed(prevLength => prevLength + e.target.value.length)
        }
        else {
            const correctCharacters = input
            .split('')
            .filter((char, index) => char === exercise[index])
            const accuracyPercentage = (correctCharacters.length / input.length) * 100
            setAccuracy(accuracyPercentage.toFixed(2))
        }
    }

    const handleStartClick = () => {
        setUserInput('')
        setAccuracy(0)
        setCompleted(false)
        setStartTime(null)
        setTotalKeysPressed(0)
        setTimeRemaining(300)
        generateExercise()
    }

    const contextValue = {
        exercise,
        userInput,
        accuracy,
        completed,
        totalKeysPressed,
        timeRemaining,
        handleInputChange,
        handleStartClick
    }

    return (
        <TypingContext.Provider value={contextValue}>
            {props.children}
        </TypingContext.Provider>
    )
}

export default TypingContextProvider