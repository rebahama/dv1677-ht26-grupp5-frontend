
import styles from './App.module.css'
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css'
import HomePage from './webpage/HomePage'
import DisplayApi from './webpage/DisplayApi'

function App() {


  return (
    <>
      <NavBar />
      <main className={styles.testing}>
        <HomePage />
        <DisplayApi />
      </main>
    </>
  )
}

export default App
