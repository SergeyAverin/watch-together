import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Center } from "@atoms/index";
import { removeCookie } from "@utils/cookie";

export const LogoutPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    removeCookie("jwt");
    navigate("/auth/login");
  });
  return (
    <Center>
      <div>Logout</div>
    </Center>
  );
};
