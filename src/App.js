import React from 'react'
import Navbar from './components/Navbar'
import TypingApp from './components/TypingApp'
import TypingContextProvider from './contexts/TypingContext'

import './components/styles.css'

function App() {
  return (
    <div>
      <TypingContextProvider>
        <Navbar />
        <TypingApp />
      </TypingContextProvider>
    </div>
  )
}

export default App