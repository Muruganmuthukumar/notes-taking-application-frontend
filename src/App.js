import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewNote from './pages/NewNote';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<h1>Hii</h1>}/>
        <Route path='/new' element={<NewNote/>}/>
        <Route path='/new' element={<h1>New</h1>}/>
        <Route path='/:id'>
          <Route index element={<h1>Show</h1>}/>
          <Route path='edit' element={<h1>Edit</h1>}/>
        </Route>
        <Route path='*' element={<Navigate to='/' />}/>
      </Routes>
    </>
  );
}

export default App;
