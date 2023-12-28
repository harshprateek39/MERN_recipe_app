
import './App.css';
import{BrowserRouter as Router,Routes, Route, useLocation} from "react-router-dom";
import Home from "./pages/home"
import Auth from "./pages/auth"
import CreateRecipe from "./pages/createRecipe"
import SavedRecipe from "./pages/savedRecipe"
import Navbar from './components/navbar';
import Contact from './pages/contact';
function App() {
  
  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/createRecipe" element={<CreateRecipe/>}/>
          <Route path="/savedRecipe" element={<SavedRecipe/>}/>
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
