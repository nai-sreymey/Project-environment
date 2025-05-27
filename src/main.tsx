// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Import Tailwind styles
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
