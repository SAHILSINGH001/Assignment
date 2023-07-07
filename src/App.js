import React from 'react'
import "./scss/index.scss";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import LoginPage from './componenets/LoginPage';
import ForgetPassword from './componenets/ForgetPassword'
import MultiForm from './componenets/MultiForm'
export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<LoginPage/>}/>
      <Route exact path='/forgetpassword' element={<ForgetPassword/>}/>
      <Route exact path='/multiform' element={<MultiForm/>}/>

      
    </Routes>
   </BrowserRouter>
  )
}
