import React, { createContext, useReducer, useEffect, useContext } from 'react'
import './styles/App.css'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import LoginScreen from './Components/LoginScreen'
import RegisterScreen from './Components/RegisterScreen'
import { reducer, initialState } from './Components/State/Reducer'
import Article from './Components/Admin/Article'
import CreateArticle from './Components/Admin/CreateArticle'
import ViewArticlebyID from './Components/ViewArticlebyID'
import UpdateArticle from './Components/Admin/UpdateArticle'
import AdminProfile from './Components/Admin/AdminProfile'

export const UserContext = createContext()

const Routing = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext)

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
      <Route path="/article" element={<Article />} />
      <Route path="/upload" element={<CreateArticle />} />
      <Route path="/:id" element={<ViewArticlebyID />} />
      <Route path="/update/:id" element={<UpdateArticle />} />
      <Route path="/adminProfile" element={<AdminProfile />} />
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