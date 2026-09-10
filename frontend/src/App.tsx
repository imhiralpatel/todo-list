import './style/App.css'
import NavBar from './components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './components/AddTask'
import List from './components/List'
import EditTask from './components/EditTask'
import Signup from './components/Signup'
import Login from './components/Login'

function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<List />} />
        <Route path='/add' element={<AddTask />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/edit/:id' element={<EditTask />} />
      </Routes>
    </>
  )
}

export default App
