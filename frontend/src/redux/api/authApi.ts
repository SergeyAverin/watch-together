import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { access_token: string; status?: number },
      { email: string; password: string }
    >({
      query(data) {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        return {
          url: "auth/login",
          method: "POST",
          credentials: "include",
          body: formData,
        };
      },
    }),
    registration: builder.mutation<
      void,
      {
        username: string;
        email: string;
        password: string;
        password2: string;
      }
    >({
      query(registrationData) {
        return {
          url: "/user/register",
          method: "POST",
          body: registrationData,
        };
      },
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation } = authApi;
