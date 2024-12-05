import React from "react";

import { Route, Routes } from "react-router-dom";
import PlayerPage from "@pages/PlayerPage";
import LoginPage from "@pages/LoginPage";
import LogoutPage from "@pages/LogoutPage";
import NotFoundPage from "@pages/NotFoundPage";
import RegistrationsPage from "@pages/RegistrationsPage";
import RoomsPage from "@pages/RoomsPage";

const MainRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/logout" element={<LogoutPage />} />
      <Route path="/auth/registration" element={<RegistrationsPage />} />
      <Route path="/player/*" element={<PlayerPage />} />
      <Route path="/rooms/*" element={<RoomsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default MainRouter;
