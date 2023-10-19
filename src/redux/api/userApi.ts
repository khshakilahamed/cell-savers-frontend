import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const USER_URL = "/users";

export const userApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCustomer: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-customer`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    addAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-admin`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.admin],
    }),
    addSuperAdmin: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-super-admin`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.superAdmin],
    }),
    addTechnician: build.mutation({
      query: (data) => ({
        url: `${USER_URL}/create-technician`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.technician],
    }),
    // get single customer
    technicians: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/technicians`,
        method: "GET",
      }),
      providesTags: [tagTypes.technician],
    }),
    admins: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/admins`,
        method: "GET",
      }),
      providesTags: [tagTypes.admin],
    }),
    superAdmins: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${USER_URL}/super-admins`,
        method: "GET",
      }),
      providesTags: [tagTypes.superAdmin],
    }),
    myProfile: build.query({
      query: () => ({
        url: `${USER_URL}/my-profile`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useAddAdminMutation,
  useAddSuperAdminMutation,
  useAddTechnicianMutation,
  useTechniciansQuery,
  useAdminsQuery,
  useSuperAdminsQuery,
  useMyProfileQuery,
} = userApi;
