import React from "react";

import { Center } from "@atoms/index";
import { LoginForm } from "@organisms/LoginForm/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <Center>
      <LoginForm />
    </Center>
  );
};

export default LoginPage;
