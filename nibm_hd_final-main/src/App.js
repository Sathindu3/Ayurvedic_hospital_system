import './App.css';
import Navbar from './Components/Navbar/Navbar';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from './Components/Footer/Footer';
import Home from './Pages/Home/Home';
import Channels from './Pages/Channels/Channels';
import Products from './Pages/Products/Products';
import Offers from './Pages/Offers/Offers';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Pages/Profile/Profile';
import Treatments from './Pages/Treatments/Treatments';
import Dashboard from './Pages/Dashboard/Dashboard';
import Aboutus from './Pages/About-us/Aboutus';
import Staff from './Pages/Staff/Staff';
import Gallery from './Pages/Gallery/Gallery';



function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/channels" element={<Channels />} />
            <Route path="/products" element={<Products />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/staff" element={<Staff />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
