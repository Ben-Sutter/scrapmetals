import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HoldingPage from "./pages/HoldingPage";
import WorkInProgress from "./pages/WorkInProgress";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HoldingPage />} />
          <Route path="/wip" element={<WorkInProgress />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
