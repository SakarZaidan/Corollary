import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { HomePage } from "./pages/HomePage";
import { VisualizationWorkspace } from "./pages/VisualizationWorkspace";
import { TeacherDashboardPage } from "./pages/TeacherDashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ExplorePage } from "./pages/ExplorePage";
import { PaymentPage } from "./pages/PaymentPage";
import { ThemeProvider } from "./components/ThemeProvider";
import { useUserStore } from "./store/userStore";

function App() {
  // Initialize auth state when app loads
  React.useEffect(() => {
    useUserStore.getState().initializeAuthState();
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workspace" element={<VisualizationWorkspace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
