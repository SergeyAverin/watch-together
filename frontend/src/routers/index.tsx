import React from "react";

import { Route, Routes } from "react-router-dom";


const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<h1>Test</h1>} />
    </Routes>
  );
};

export default MainRouter;
