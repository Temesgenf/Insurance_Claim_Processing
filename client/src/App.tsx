import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClaimsPage from "./pages/ClaimsPage";
import NewClaimPage from "./pages/NewClaimPage";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/claims" element={<ClaimsPage />} />
          <Route path="/user/new-claim" element={<NewClaimPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
