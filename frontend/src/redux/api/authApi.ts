import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { access_token: string },
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
  }),
});

export const { useLoginMutation } = authApi;
