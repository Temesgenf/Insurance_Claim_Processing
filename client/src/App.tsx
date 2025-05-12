// App.tsx
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClaimsPage from "./pages/ClaimsPage";
import ClaimDetailPage from "./pages/ClaimDetailPage";
import NewClaimPage from "./pages/NewClaimPage";
import UserDashboard from "./pages/UserDashboard";
import AdminPage from "./pages/AdminPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminPoliciesPage from "./pages/AdminPoliciesPage";
import AdminClaimsPage from "./pages/AdminClaimsPage";
import AdminAnalyticsPage from "./pages/AdminAnalyticsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";
import AdminProductPage from "./pages/AdminProductPage";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PoliciesPage from "./pages/PoliciesPage";
import NewPolicyPage from "./pages/NewPolicyPage";
import { AuthProvider, useAuth } from "./Context/AuthContext";

const PrivateRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

const AdminRoute = () => {
  const { user } = useAuth();
  const location = useLocation();
  console.log("User:", user);

  if (!user?.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

// console.log(import.meta.env.REACT_APP_API_BASE_URL);
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products/:productId" element={<ProductDetail />} />

        {/* Protected User Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/claims" element={<ClaimsPage />} />
          <Route
            path="/user/claims/:claimNumber"
            element={<ClaimDetailPage />}
          />
          <Route path="/user/policies" element={<PoliciesPage />} />
          <Route path="/user/new-policy" element={<NewPolicyPage />} />
          <Route path="/user/new-claim" element={<NewClaimPage />} />
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/policies" element={<AdminPoliciesPage />} />
            <Route path="/admin/claims" element={<AdminClaimsPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
