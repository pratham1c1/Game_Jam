import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UserGames from './pages/ProfileGames/UserGames'
import GameDetails from './pages/GameDetails/GameDetails'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/PageHeader/Header'
import CommonHeader from './components/PageHeader/CommonHeader'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='AppPage'>
        <Router>
          <CommonHeader/>
          <Routes>
            <Route path="/" element={<UserGames />} />
            <Route path="/GamePage" element={<GameDetails />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App