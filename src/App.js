import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { AuthProvider } from './auth/AuthContext';

function App() {
  
  return (
    <>
      <AuthProvider>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Register/>}/>
          <Route path='/new' element={<NewNote/>} />
          <Route path='/:id'>
            <Route index element={<h1>Show</h1>}/>
            <Route path='edit' element={<EditNote/>}/>
          </Route>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='*' element={<Navigate to='/' />}/>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
