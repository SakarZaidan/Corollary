import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@mantine/core/styles.css"; // Import Mantine's core styles
import { MantineProvider } from "@mantine/core"; // Import MantineProvider

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* MantineProvider wraps the entire application to provide theming and styles */}
    <MantineProvider>
      <App />
    </MantineProvider>
  </React.StrictMode>
);
