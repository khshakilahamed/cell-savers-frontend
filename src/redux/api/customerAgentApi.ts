import { ICustomer, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const CUSTOMER_AGENT_URL = "/customer-agents";

export const customerAgentApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all customer agent
    customerAgents: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: CUSTOMER_AGENT_URL,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customerAgent, tagTypes.user],
    }),
    // get single customer agent
    customerAgent: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${CUSTOMER_AGENT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.customer, tagTypes.user],
    }),
    // update customer agent
    updateCustomerAgent: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_AGENT_URL}/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [
        tagTypes.customerAgent,
        tagTypes.user,
        tagTypes.technician,
        tagTypes.admin,
        tagTypes.superAdmin,
      ],
    }),
    // delete customer agent
    deleteCustomerAgent: build.mutation({
      query: (id) => ({
        url: `${CUSTOMER_AGENT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [
        tagTypes.customerAgent,
        tagTypes.user,
        tagTypes.technician,
        tagTypes.admin,
        tagTypes.superAdmin,
      ],
    }),
    availableTechnicians: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${CUSTOMER_AGENT_URL}/available-technician`,
          method: "GET",
          params: arg,
        };
      },
      providesTags: [tagTypes.customerAgent, tagTypes.user],
    }),
  }),
});

export const {
  useCustomerAgentQuery,
  useCustomerAgentsQuery,
  useUpdateCustomerAgentMutation,
  useDeleteCustomerAgentMutation,
  useAvailableTechniciansQuery,
} = customerAgentApi;
