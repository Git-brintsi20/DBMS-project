import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/home/home'
import Navbar from './pages/Navbar/navbar'



function App() {

  return (
    <>
        <Router>
                    <Navbar/>
                    <Routes>

                        <Route path="/" element={<Home/>}></Route>
                        //Create More Routes Here
                       
                    </Routes>
                </Router>     
    </>
  )
}

export default App
