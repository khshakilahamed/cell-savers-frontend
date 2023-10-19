import { IBlog, IBooking, IFaq, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const BOOKING_URL = "/bookings";

export const bookingApi: any = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // get all bookings
    bookings: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BOOKING_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBooking[], meta: IMeta) => {
        return {
          bookings: response,
          meta,
        };
      },
      providesTags: [tagTypes.booking],
    }),
    // get single booking
    booking: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    // update booking
    updateBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // delete booking
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    customerMyBooking: build.query({
      query: () => ({
        url: `${BOOKING_URL}/customer-my-bookings`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
  }),
});

export const {
  useAddBookingMutation,
  useBookingQuery,
  useBookingsQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
  useCustomerMyBookingQuery,
} = bookingApi;
