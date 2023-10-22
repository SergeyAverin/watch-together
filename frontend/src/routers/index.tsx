import React from "react";

import { Route, Routes } from "react-router-dom";
import PlayerPage from "@pages/PlayerPage";


const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/*" element={<PlayerPage />} />
    </Routes>
  );
};

export default MainRouter;
