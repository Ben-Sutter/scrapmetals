import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HoldingPage from "./pages/HoldingPage";
import WorkInProgress from "./pages/WorkInProgress";
import EmailHolding from "./pages/EmailHolding";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<EmailHolding />} />
          <Route path="/old" element={<HoldingPage />} />
          <Route path="/wip-api" element={<WorkInProgress />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
