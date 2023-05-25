import React, { useContext } from 'react'
import './styles.css'
import { TypingContext } from '../contexts/TypingContext'

const TypingApp = () => {
    const {
        exercise,
        userInput,
        accuracy,
        completed,
        totalKeysPressed,
        timeRemaining,
        handleInputChange,
        handleStartClick} = useContext(TypingContext)

        const formatTime = (time) => {
            const minutes = Math.floor(time / 60)
            const seconds = time % 60
            return `${minutes}:${seconds.toString().padStart(2, '0')}`
        }
  return (
    <div className='typing-app'>
        <div className='left-container'>
            <h2 className='heading'>Touch Typing Practice With Basic Keys i.e. <strong>'asdfjkl;'</strong></h2>
            <img src='https://res.cloudinary.com/dyhmlxkki/image/upload/v1684930616/touch-typing-fingers_lgn6j8.png' alt='typing' className='typing-image' />
        </div>
        <div className='right-container'>
            <div className='exercise'>
                <h3>Exercise: {exercise}</h3>
            </div>
            <textarea 
                value={userInput}
                onChange={handleInputChange}
                rows={2} cols={30} className='text-area'
                placeholder='Start typing...'
                // disabled={completed}
                />
            <div className='details'>
                <h4 className='accuracy'>Accuracy: {accuracy}%</h4>
                <h4>Total Keys Pressed: {totalKeysPressed}</h4>
                {completed ? (
                    <h4>Exercise Completed!</h4>
                ) : (
                    <h4>TIme Remaining: {formatTime(timeRemaining)}</h4>
                )}
                <button onClick={handleStartClick}>Start</button>
            </div>
        </div>
    </div>
  )
}

export default TypingApp