import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './pages/NewNote';
import EditNote from './pages/EditNote';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Profile from './components/Profile';
import { AuthProvider } from './context/AuthContext';
// import PrivateRoutes from './components/PrivateRoutes';

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='*' element={<Navigate to='/' />} />
            <Route path='/:id'>
              <Route index element={<h1>Show</h1>} />
              <Route path='edit' element={<EditNote />} />
            </Route>
            <Route path='/profile' element={<Profile />} />
            <Route path='/new' element={<NewNote />} />
            <Route path='/home' element={<Home />} />
          {/* <Route element={<PrivateRoutes/>}> */}
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
