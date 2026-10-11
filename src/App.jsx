
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.css'
import NavBar from './components/NavBar'
import HomePage from './webpage/HomePage'
import DisplayApi from './webpage/DisplayApi'
import RegisterPage from './webpage/auth/RegisterPage'
import LoginPage from './webpage/auth/LoginPage'

function App() {


  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showall" element={<DisplayApi />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
