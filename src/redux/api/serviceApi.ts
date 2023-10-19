import { ICustomer, IMeta, IService } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const SERVICE_URL = "/services";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.services],
    }),
    // get all services
    services: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SERVICE_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IService[], meta: IMeta) => {
        return {
          services: response,
          meta,
        };
      },
      providesTags: [tagTypes.services],
    }),
    // get single service
    service: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),
    // update service
    updateService: build.mutation({
      query: (data) => ({
        url: `${SERVICE_URL}/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.services],
    }),
    // delete service
    deleteService: build.mutation({
      query: (id) => ({
        url: `${SERVICE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.services],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useServicesQuery,
  useServiceQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
