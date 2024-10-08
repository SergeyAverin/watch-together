import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Input, Form, Submit } from "@atoms/index";
import { useLoginMutation } from "@redux/api/authApi";
import { getCookie, isCookieExist, setCookie } from "@utils/cookie";

type FormValues = {
  email: string;
  password: string;
};

export const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [login] = useLoginMutation();
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    login({ email: data.email, password: data.password })
      .unwrap()
      .then((res) => {
        setCookie("jwt", res.access_token, 100);
        navigate("/room/");
      })
      .catch((data) => {
        if (data.status == 403) {
          setServerErrorMessage("Invalid email or password");
        }
      });
  };

  const isExist = isCookieExist("jwt");

  useEffect(() => {
    if (isExist) {
      navigate("/room/");
    }
  }, [isExist]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="email">Email</label>
      <input
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email",
          },
        })}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        {...register("password", { required: "password is required" })}
      />

      <Submit value="Login" />

      {errors.email && <div>{errors.email.message}</div>}
      {serverErrorMessage && <div>{serverErrorMessage}</div>}
    </Form>
  );
};
