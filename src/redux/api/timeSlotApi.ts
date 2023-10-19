import { ICustomer, IMeta, IService, ITimeSlot } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const TIME_SLOT_URL = "/time-slots";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addTimeSlot: build.mutation({
      query: (data) => ({
        url: `${TIME_SLOT_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),
    // get all time slots
    timeSlots: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: TIME_SLOT_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ITimeSlot[], meta: IMeta) => {
        return {
          timeSlots: response,
          meta,
        };
      },
      providesTags: [tagTypes.timeSlot],
    }),
    // get single time slot
    timeSlot: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${TIME_SLOT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.timeSlot],
    }),
    // update time slot
    updateTimeSlot: build.mutation({
      query: (data) => ({
        url: `${TIME_SLOT_URL}/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),
    // delete time slot
    deleteTimeSlot: build.mutation({
      query: (id) => ({
        url: `${TIME_SLOT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.timeSlot],
    }),
  }),
});

export const {
  useAddTimeSlotMutation,
  useTimeSlotsQuery,
  useTimeSlotQuery,
  useUpdateTimeSlotMutation,
  useDeleteTimeSlotMutation,
} = serviceApi;
