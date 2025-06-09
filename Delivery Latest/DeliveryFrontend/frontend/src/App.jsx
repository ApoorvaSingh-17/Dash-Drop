import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Home from './pages/Home'
import './App.css'
import AdminOrders from './pages/AdminOrders'
import UpdateLocation from './pages/UpdateLocation'
import UpdateLocationForm from './pages/UpdateLocationForm'
import Tracking from './pages/Tracking'
import User from './pages/User'
import UserLandingPage from "./pages/UserLandingPage"
import UserHomePage from "./pages/UserHomePage"
import SignUp from './pages/Signup';
import Admin from './pages/Admin'
import AdminRegister from './pages/AdminRegister';
import AdminLogin from './pages/AdminLogin';
import LoginUser from './pages/LoginUser'
import Tracking_id from './pages/Tracking-id';
import CourierForm from './pages/CourierForm';
import ApprovalStaffItem from './pages/Approval';
import About from './pages/About';
import ViewOrderPage from './pages/ViewOrderPage';
import 'leaflet/dist/leaflet.css';
import 'antd/dist/reset.css';
import PaymentPage from './pages/PaymentPage';
import OrderSuccess from './pages/OrderSuccess';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/userLand" element={<UserLandingPage />} />
        <Route path="/userHome" element={<UserHomePage />} />
        <Route path="/tracking/:orderId" element={<Tracking />} />
        <Route path="/userRegister" element={<SignUp />} />
        <Route path="/userLogin" element={<LoginUser />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/orders" element={<AdminOrders />} />
        <Route path="/approval" element={<ApprovalStaffItem />} />
        <Route path="/adminRegister" element={<AdminRegister />} />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route path="/update" element={<UpdateLocation />} />
        <Route path="/updateForm" element={<UpdateLocationForm />} />
        <Route path="/tracking-id" element={<Tracking_id />} />
        <Route path="/courierForm" element={<CourierForm />} />
        <Route path="/viewOrder" element={<ViewOrderPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
       
       

      </Routes>
    </Router>
  );
}

export default App;