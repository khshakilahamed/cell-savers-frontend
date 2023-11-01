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
    // confirm booking
    confirmBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/confirm-booking/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // confirm booking
    cancelBooking: build.mutation({
      query: (id) => ({
        url: `${BOOKING_URL}/cancel-booking/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    // get all technician bookings
    technicianBooking: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${BOOKING_URL}/technician-bookings`,
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
    // update technician booking
    updateTechnicianBooking: build.mutation({
      query: (data) => ({
        url: `${BOOKING_URL}/technician-my-booking`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.booking],
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
  useConfirmBookingMutation,
  useCancelBookingMutation,
  useTechnicianBookingQuery,
  useUpdateTechnicianBookingMutation,
} = bookingApi;
