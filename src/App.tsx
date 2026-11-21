import { Navigate, Route, Routes } from "react-router-dom";
import PortfolioPage from "./portfolio/PortfolioPage";
import AboutPage from "./portfolio/pages/AboutPage";
import ServicesPage from "./portfolio/pages/ServicesPage";
import ImpressumPage from "./legal/ImpressumPage";
import DatenschutzPage from "./legal/DatenschutzPage";

/**
 * The route table, shared by the client entry and the build-time prerender.
 * German lives at the root, Russian under `/ru` so both languages have their
 * own indexable URLs.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/leistungen" element={<ServicesPage />} />
      <Route path="/ueber-mich" element={<AboutPage />} />
      <Route path="/impressum" element={<ImpressumPage />} />
      <Route path="/datenschutz" element={<DatenschutzPage />} />

      <Route path="/ru" element={<PortfolioPage />} />
      <Route path="/ru/leistungen" element={<ServicesPage />} />
      <Route path="/ru/ueber-mich" element={<AboutPage />} />
      <Route path="/ru/impressum" element={<ImpressumPage />} />
      <Route path="/ru/datenschutz" element={<DatenschutzPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
