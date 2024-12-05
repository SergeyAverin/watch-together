import React from "react";

import { Center } from "@atoms/index";
import { LoginForm } from "@organisms/LoginForm/LoginForm";

export const LoginPage: React.FC = () => {
  return (
    <Center>
      <LoginForm />
    </Center>
  );
};
