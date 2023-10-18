import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    userRegister: build.mutation({
      query: (registerData) => ({
        url: `${AUTH_URL}/register`,
        method: "POST",
        data: registerData,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;
