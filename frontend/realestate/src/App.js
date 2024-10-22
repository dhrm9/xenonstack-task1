import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/DashBoard';
import ProfilePage from './Components/Profile';
import {Routes,Route} from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth";
function App() {
  return (
      <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Dashboard/>}></Route>
        <Route path="/profile" element={<ProfilePage/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
