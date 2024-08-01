
import './App.css'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import Allbooks from './pages/Allbooks'
import Home from './pages/Home'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Login from './pages/Login'
import Signup from './pages/Signup'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import BookDetails from './components/BookDetails/BookDetails'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authAction } from './store/auth'
import Favourites from './components/Profile/Favourites'
import OrderHistory from './components/Profile/OrderHistory'
import Setting from './components/Profile/Setting'
import AllordersAmin from './pages/AllordersAmin'
import Addbooksadmin from './pages/Addbooksadmin'
import UpdateBook from './pages/UpdateBook'
function App() {

  const dispatch = useDispatch();
  const role =useSelector((state)=>state.auth.role);
  useEffect(()=>{
if(localStorage.getItem("id")&& localStorage.getItem("token")&&localStorage.getItem("role")
){
  dispatch(authAction.login());
  dispatch(authAction.changeRole(localStorage.getItem("role")))
}
  },[])

  return (
    <>
    <div  > 
      
      <Navbar/>
      <Routes>
        <Route exact path ="/" element={<Home/>}/>
        <Route path ="/allbooks" element={<Allbooks/>}/>
        <Route path ="/cart" element={<Cart/>}/>
        <Route path ="/profile" element={<Profile/>}>
        {role==="admin" ?(<Route index element={<AllordersAmin/>} />):( <Route index element={<Favourites/>} />)}
        {role==="admin" &&( <Route path='/profile/add-books' element={<Addbooksadmin/>} />)}
       
        
        <Route path='/profile/orderHistory' element={<OrderHistory/>} />
        <Route path='/profile/setting' element={<Setting/>} />
        </Route>
        <Route path ="/UpdateBook/:id" element={<UpdateBook/>}/>
        <Route path ="/login" element={<Login/>}/>
        <Route path ="/signup" element={<Signup/>}/>
        <Route path ="/books-details/:id" element={<BookDetails/>}/>
      </Routes>      
      <Footer/>
      
      
     
    </div>
    </>
  )
}

export default App
