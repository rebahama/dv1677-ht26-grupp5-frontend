
import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './App.module.css'
import NavBar from './components/NavBar'
import HomePage from './webpage/HomePage'
import DisplayApi from './webpage/DisplayApi'

function App() {


  return (
    <>
      <NavBar />
      <main className={styles.testing}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/showall" element={<DisplayApi />} />
        </Routes>
      </main>
    </>
  )
}

export default App
