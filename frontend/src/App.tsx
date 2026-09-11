import './style/App.css'
import NavBar from './components/NavBar'
import { Navigate, Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import EditTask from './components/EditTask'
import Signup from './components/Signup'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          <Route path="/" element={<List />} />
          <Route path='/add' element={<AddTask />} />
          <Route path='/edit/:id' element={<EditTask />} />
        </Route>

        {/* =========================
                    PUBLIC ROUTES
                ========================= */}

        <Route element={<PublicRoute />}>

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />

        </Route>


        {/* =========================
                    DEFAULT
                ========================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/list"
              replace
            />
          }
        />
      </Routes>
    </>
  )
}

export default App
