import React from "react";

import { Route, Routes } from "react-router-dom";
import PlayerPage from "@pages/PlayerPage";
import LoginPage from "@pages/LoginPage";
import LogoutPage from "@pages/LogoutPage";
import NotFoundPage from "@pages/NotFoundPage";

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/logout" element={<LogoutPage />} />
      <Route path="/room/*" element={<PlayerPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRouter;
