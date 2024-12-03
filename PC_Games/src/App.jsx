import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UserGames from './components/ProfileGames/UserGames.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='AppPage'>
        <UserGames />
      </div>
    </>
  )
}

export default App