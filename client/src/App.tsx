import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClaimsPage from "./pages/ClaimsPage";
import NewClaimPage from "./pages/NewClaimPage";
import UserDashboard from "./pages/UserDashboard";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/products/:productName" element={<ProductDetail />} /> */}
          <Route path="/user/claims" element={<ClaimsPage />} />
          <Route path="/user/new-claim" element={<NewClaimPage />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
