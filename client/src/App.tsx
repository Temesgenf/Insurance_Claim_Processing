// App.tsx
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import { useAuth } from "./Context/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import { useSocket } from "./Context/SocketContext";
import AccountSettingsPage from "./pages/AccountSettingsPage";

// Lazy load all large page components
const HomePage = lazy(() => import("./pages/HomePage"));
const ClaimsPage = lazy(() => import("./pages/ClaimsPage"));
const ClaimDetailPage = lazy(() => import("./pages/ClaimDetailPage"));
const NewClaimPage = lazy(() => import("./pages/NewClaimPage"));
const UserDashboard = lazy(() => import("./pages/UserDashboard"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const AdminUsersPage = lazy(() => import("./pages/AdminUsersPage"));
const AdminPoliciesPage = lazy(() => import("./pages/AdminPoliciesPage"));
const AdminClaimsPage = lazy(() => import("./pages/AdminClaimsPage"));
const AdminAnalyticsPage = lazy(() => import("./pages/AdminAnalyticsPage"));
const AdminSettingsPage = lazy(() => import("./pages/AdminSettingsPage"));
const AdminProductPage = lazy(() => import("./pages/AdminProductPage"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Login = lazy(() => import("./pages/Login"));
const PoliciesPage = lazy(() => import("./pages/PoliciesPage"));
const NewPolicyPage = lazy(() => import("./pages/NewPolicyPage"));
const DetailPolicy = lazy(() => import("./pages/DetailPolicy"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const EditProfilePage = lazy(() => import("./pages/EditProfilePage"));
const EmailVerify = lazy(() => import("./pages/EmailVerify"));
const OnboardingRegister = lazy(() => import("./pages/OnboardingRegister"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
  </div>
);

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

const UserRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Only allow if user is logged in and NOT admin
  if (!user || user.isAdmin) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <Outlet />;
};

// console.log(import.meta.env.REACT_APP_API_BASE_URL);
function App() {
const socket = useSocket();
 useEffect(() => {
  if (!socket) return;

  //emit notification
  socket.emit("notification", { message: "Hello from client" });

  return () => {
    socket.off("notification");
  };
}, [socket]);
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Public Routes */}
       

        {/* Protected User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<OnboardingRegister />} />
        <Route path="/email-verified" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/reset-password" element={<ResetPassword />}/>
        <Route element={<PrivateRoute />}>
          <Route element={<UserRoute />}>
            <Route element={<AppLayout />}>
            <Route path="/user/account-settings" element={<AccountSettingsPage />} />
              <Route path="user/products" element={<ProductsPage />} />
              <Route path="/user/profilepicture" element={<EditProfilePage />} />
              {/* <Route path="/products" element={<HomePage />} /> */}
              <Route path="/products/:productId" element={<ProductDetail />} />
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/claims" element={<ClaimsPage />} />
              <Route
                path="/user/claims/:claimNumber"
                element={<ClaimDetailPage />}
              />
              <Route path="/user/policies" element={<PoliciesPage />} />
              <Route path="/user/new-policy" element={<NewPolicyPage />} />
              <Route path="/user/new-claim" element={<NewClaimPage />} />
              <Route path="/user/policies/:policyId" element={<DetailPolicy />} />
            </Route>
          </Route>
        </Route>

        {/* Protected Admin Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<AdminRoute />}>
          <Route element={<AppLayout />}>
          <Route path="/admin/dashboard" element={<AdminPage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/policies" element={<AdminPoliciesPage />} />
            <Route path="/admin/claims" element={<AdminClaimsPage />} />
            <Route path="/admin/analytics" element={<AdminAnalyticsPage />} />
            <Route path="/admin/settings" element={<AdminSettingsPage />} />
            <Route path="/admin/products" element={<AdminProductPage />} />
          </Route>
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
