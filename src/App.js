import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register/Register';
import Navbar from './Navbar/Navbar';
import SignIn from './SignIn/SignIn';
import Home from './Home/Home'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={localStorage.getItem("Token") ? <Home /> : <Navigate to='/sign_in' />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/sign_in' element={<SignIn />}></Route>
      </Routes>
    </div>
  );
}

export default App;
