import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HoldingPage from "./pages/HoldingPage";
import WorkInProgress from "./pages/WorkInProgress";
import EmailHolding from "./pages/WIPemailHolding";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HoldingPage />} />
          <Route path="/wip-api" element={<WorkInProgress />} />
          <Route path="/wip-email" element={<EmailHolding />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
