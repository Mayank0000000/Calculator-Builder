import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Calculator from './components/Calculator'
import { ThemeProvider } from './store/themeContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ThemeProvider> <Calculator/></ThemeProvider>
    </>
  )
}

export default App
