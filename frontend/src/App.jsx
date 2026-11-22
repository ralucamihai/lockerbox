import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import LockersPage from "./pages/LockersPage.jsx";
import LockerDetaliuPage from "./pages/LockerDetaliuPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import RegulamentPage from "./pages/RegulamentPage.jsx";
import DesprePage from "./pages/DesprePage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Harta rutelor. Layout înconjoară fiecare pagină.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LockersPage />} />
        <Route path="/lockers/:id" element={<LockerDetaliuPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/regulament" element={<RegulamentPage />} />
        <Route path="/despre" element={<DesprePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
