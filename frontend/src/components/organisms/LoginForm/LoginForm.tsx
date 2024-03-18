import React, { useEffect } from "react";
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
  const navigate = useNavigate();

  const onSubmit = (data: FormValues) => {
    login({email: data.email, password: data.password}).then((res) => {
      console.log(res)

      //  setCookie('jwt', data.res.access_token, 1)

      navigate('/room/')
    })
  };

  const isExist =isCookieExist('jwt')

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
      <input type="password" {...register("password", { required: "password is required" })} />

      <Submit value="Login" />

      {errors.email && <div>{errors.email.message}</div>}
    </Form>
  );
};
