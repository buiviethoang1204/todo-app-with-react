import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './Register/Register';
import Navbar from './Navbar/Navbar';
import SignIn from './SignIn/SignIn';
import Home from './Home/Home';
import PrivateRoutes from './PrivateRoutes/PrivateRoutes'

function App() {
  return (
    <div className="App">
    <Navbar />
    <Routes>
      <Route path='/' element={<PrivateRoutes><Home/></PrivateRoutes>}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/sign_in' element={<SignIn />}></Route>
    </Routes>
    </div>
  );
}

export default App;
