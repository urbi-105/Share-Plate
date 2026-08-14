import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DonorDashboard from "./pages/DonorDashboard";
import NGODashboard from "./pages/NGODashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ShareFood from "./pages/ShareFood";
import FoodFeed from "./pages/FoodFeed";
import FoodDetails from "./pages/FoodDetails";
import MyFoods from "./pages/MyFoods";
import MyRequests from "./pages/MyRequests";
import About from "./pages/About";
import IncomingRequests from "./pages/IncomingRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/share-food" element={<ShareFood />} />
          <Route path="/food-feed" element={<FoodFeed />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/ngo-dashboard" element={<NGODashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/my-foods" element={<MyFoods />} />
          <Route path="/my-requests" element={<MyRequests />} />
          <Route path="/about" element={<About />} />
          <Route path="/incoming-requests" element={<IncomingRequests />} />
        
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;