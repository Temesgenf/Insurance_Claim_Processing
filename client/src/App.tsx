import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClaimsPage from "./pages/ClaimsPage";
import NewClaimPage from "./pages/NewClaimPage";
import UserDashboard from "./pages/UserDashboard";
import CriticalCareInsurance from "./pages/products/CriticalCareInsurance";
import HospitalDailyCashBenefitInsurance from "./pages/products/HospitalDailyCashBenefitInsurance";
import VectorCareInsurance from "./pages/products/VectorCareInsurance";
import AmbulanceServiceInsurance from "./pages/products/AmbulanceServiceInsurance";
import FamilyHealthProtectionInsurance from "./pages/products/FamilyHealthProtectionInsurance";
import SeniorCitizenHealthCoverInsurance from "./pages/products/SeniorCitizenHealthCoverInsurance";
import MaternityChildCareInsurance from "./pages/products/MaternityChildCareInsurance";
import PersonalAccidentProtectionInsurance from "./pages/products/PersonalAccidentProtectionInsurance";
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
          <Route
            path="/products/critical-care"
            element={<CriticalCareInsurance />}
          />
          <Route
            path="/products/hospital-daily-cash"
            element={<HospitalDailyCashBenefitInsurance />}
          />
          <Route
            path="/products/vector-care"
            element={<VectorCareInsurance />}
          />
          <Route
            path="/products/ambulance-service"
            element={<AmbulanceServiceInsurance />}
          />
          <Route
            path="/products/family-health-protection"
            element={<FamilyHealthProtectionInsurance />}
          />
          <Route
            path="/products/senior-citizen-health"
            element={<SeniorCitizenHealthCoverInsurance />}
          />
          <Route
            path="/products/maternity-child-care"
            element={<MaternityChildCareInsurance />}
          />
          <Route
            path="/products/personal-accident"
            element={<PersonalAccidentProtectionInsurance />}
          />
          <Route path="/user/claims" element={<ClaimsPage />} />
          <Route path="/user/new-claim" element={<NewClaimPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
