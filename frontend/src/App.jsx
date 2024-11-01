import './App.css'

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home/home';
import Navbar from './pages/Navbar/navbar';
import Footer from './pages/Footer/foot';
import Login from "./pages/Login/login";
import Signup from "./pages/Signup/signup";
import BookDetails from "./pages/BookDetails/bookDetails";
import BookAdding from "./pages/BookAdding/bookAdding";

function App() {

  return (
    <>
        <Router>
                    <Navbar/>
                    <Routes>

                        <Route path="/" element={<Home/>}/>

                        <Route path="/bookDetails" element={<BookDetails/>}/>  

                        <Route path="/bookAdding" element={<BookAdding/>}/>                   

                        <Route path="/login" element={ <Login/>}/>                        
                         
                        <Route path={"/signup"} element={<Signup/>}/>                       
                         
                        
                    </Routes>
                    <Footer/>
                </Router>     
    </>
  )
}

export default App
