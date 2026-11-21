import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { detectLang } from "./portfolio/lang";
import "./styles/globals.css";

document.documentElement.lang = detectLang();

const container = document.getElementById("root");

if (!container) {
  throw new Error("The #root element is missing from the document.");
}

hydrateRoot(
  container,
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
