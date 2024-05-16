import { BrowserRouter as Router, Routes , Route } from 'react-router-dom';

import './App.css'

import Game from './pages/Game/Game';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import WinnersTable from './pages/Game/WinnersTable';

function App() {

  return (
   <>
    <Router>
      <Routes>
        <Route path="/signup" element={<Login route={'signup'}/>} />
        <Route path="/game" element={<Game />} />
        <Route path="/winners" element={<WinnersTable />} />
      </Routes>
    </Router>
    <ToastContainer />
   </>

  )
}

export default App
