import React, { createContext, useReducer, useEffect, useContext } from 'react'
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import LoginScreen from './Components/LoginScreen'
import RegisterScreen from './Components/RegisterScreen'
import ProfileScreen from './Components/ProfileScreen'
import LandingScreen from './Components/LandingScreen'
import CreatePost from './Components/Post/CreatePost'
import { reducer, initialState } from './Components/State/Reducer'
import Article from './Components/Post/Article'

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext)

  //if user not registered they will be redirect to the login page
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "USER", payload: user })
    } else {
      navigate('/')
    }
  }, [])

  return (
    <Routes>
      <Route exact path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/home" element={<LandingScreen />} />
      <Route path="/article" element={<Article />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  )

}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Routing />
      </Router>
    </UserContext.Provider>
  )
}

export default App