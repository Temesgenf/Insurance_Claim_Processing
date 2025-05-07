import "./App.css";
import { Route, Routes } from "react-router-dom";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
