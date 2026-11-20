import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PortfolioPage from "./portfolio/PortfolioPage";
import ImpressumPage from "./legal/ImpressumPage";
import DatenschutzPage from "./legal/DatenschutzPage";
import { detectLang } from "./portfolio/lang";
import "./styles/globals.css";

document.documentElement.lang = detectLang();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/impressum" element={<ImpressumPage />} />
        <Route path="/datenschutz" element={<DatenschutzPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
