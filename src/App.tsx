import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import VisualizationWorkspace from "./pages/VisualizationWorkspace";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workspace" element={<VisualizationWorkspace />} />
      </Routes>
    </Router>
  );
}

export default App;
