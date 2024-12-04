import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Input, Form, Submit, Margin } from "@atoms/index";
import { useLoginMutation, useRegistrationMutation } from "@redux/api/authApi";
import { getCookie, isCookieExist, setCookie } from "@utils/cookie";

type FormValues = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

export const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const [registerMutation] = useRegistrationMutation();
  const [serverErrorMessage, setServerErrorMessage] = useState<string | null>(
    null
  );
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    registerMutation({
      email: data.email,
      password: data.password1,
      username: data.username,
      password2: data.password2,
    })
      .unwrap()
      .then((res) => {
        navigate("/auth/login");
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
      <label htmlFor="username">Username</label>
      <input
        {...register("username", {
          required: "Username is required",
        })}
      />

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

      <label htmlFor="password1">Password</label>
      <input
        type="password"
        {...register("password1", { required: "password is required" })}
      />

      <label htmlFor="password2">Password replay</label>
      <input
        type="password"
        {...register("password2", { required: "password replay is required" })}
      />

      <Margin marginTop="15px">
        <Link to={"/auth/login"}>login</Link>
      </Margin>

      <Submit value="Registration" />

      {errors.email && <div>{errors.email.message}</div>}
      {serverErrorMessage && <div>{serverErrorMessage}</div>}
    </Form>
  );
};
