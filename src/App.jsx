import { Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import DisplayApi from './webpage/DisplayApi'
import RegisterPage from './webpage/auth/RegisterPage'
import LoginPage from './webpage/auth/LoginPage'
import MyBookings from './webpage/MyBookings'
import ProtectedRoute from './components/ProtectRoute'
import BookingDetails from './webpage/BookingDetails'
import CreateBooking from './webpage/CreateBooking'
import DetaliedResources from './webpage/DetaliedResources'
import SyncDatabase from './webpage/SyncDatabase'
import UpdateBooking from './webpage/UpdateBooking'

function App() {

  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<DisplayApi />} />
          <Route path="/showall" element={<DisplayApi />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/bookings/detail/:id" element={<DetaliedResources />} />
            <Route path="/bookings/:id" element={<BookingDetails />} />
            <Route path="/create/:id" element={<CreateBooking />} />
            <Route path="/sync" element={<SyncDatabase />} />
            <Route path="/bookings/update/:id" element={< UpdateBooking />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
