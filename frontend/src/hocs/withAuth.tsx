import { isCookieExist } from "@utils/cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function withAuth(WrappedComponent: React.FC) {
  return function WithAuth() {
    const navigate = useNavigate();
    const isExist = isCookieExist("jwt");

    useEffect(() => {
      if (!isExist) {
        navigate("/auth/login");
      }
    }, [isExist]);

    return <WrappedComponent />;
  };
}
