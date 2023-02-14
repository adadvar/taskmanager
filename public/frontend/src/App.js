import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import UpdateUser from './pages/UpdateUser'
import UpdateTodo from './pages/UpdateTodo'
import Dashboard2 from './pages/Dashboard2'
import GoogleCallback from './pages/GoogleCallback'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path="/auth/google" element={<GoogleCallback />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/update-user' element={<UpdateUser />} />
            <Route path='/todo/update/:id' element={<UpdateTodo />} />
            <Route path='/dashboard' element={<Dashboard2 />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
