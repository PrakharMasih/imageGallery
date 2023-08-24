import Signup from "./pages/Signup"
import Login from "./pages/login"
import Navbar from "./pages/Navbar"
import { Route, Routes } from 'react-router-dom';
import PhotoById from "./pages/PhotoById";
import PrivateComponent from './pages/PrivateComponent'
import Upload from "./pages/Upload";
import Home from "./pages/Home";


function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />} >
          <Route path='/' element={<Home />} />
          <Route path="/:Id" element={<PhotoById />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<> <h1>Page Not Found</h1> </>} />
      </Routes>
    </>
  )
}

export default App
