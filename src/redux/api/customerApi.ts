import { ICustomer, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const CUSTOMER_URL = "/customers";

export const customerApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all customer
    customers: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CUSTOMER_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ICustomer[], meta: IMeta) => {
        return {
          customers: response,
          meta,
        };
      },
      providesTags: [tagTypes.customer],
    }),
    // get single customer
    customer: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customer],
    }),
    // update customer
    updateCustomer: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.customer],
    }),

    // delete customer
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
});

export const {
  useCustomersQuery,
  useCustomerQuery,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
