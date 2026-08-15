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
import ProtectedRoute from "./components/ProtectedRoute";
import EditFood from "./pages/EditFood";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
  path="/share-food"
  element={
    <ProtectedRoute allowedRoles={["donor"]}>
      <ShareFood />
    </ProtectedRoute>
  }
/>
          <Route path="/food-feed" element={<FoodFeed />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route
  path="/donor-dashboard"
  element={
    <ProtectedRoute allowedRoles={["donor"]}>
      <DonorDashboard />
    </ProtectedRoute>
  }
/>
          <Route
  path="/ngo-dashboard"
  element={
    <ProtectedRoute allowedRoles={["ngo"]}>
      <NGODashboard />
    </ProtectedRoute>
  }
/>
          <Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute allowedRoles={["admin"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
          <Route
  path="/my-foods"
  element={
    <ProtectedRoute allowedRoles={["donor"]}>
      <MyFoods />
    </ProtectedRoute>
  }
/>
          <Route
  path="/my-requests"
  element={
    <ProtectedRoute allowedRoles={["ngo"]}>
      <MyRequests />
    </ProtectedRoute>
  }
/>
          <Route path="/about" element={<About />} />
          <Route
  path="/incoming-requests"
  element={
    <ProtectedRoute allowedRoles={["donor"]}>
      <IncomingRequests />
    </ProtectedRoute>
  }
/>
<Route path="/edit-food/:id" element={<EditFood />} />
        
        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default App;