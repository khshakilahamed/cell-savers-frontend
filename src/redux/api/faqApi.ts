import { IBlog, IFaq, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const FAQ_URL = "/faqs";

export const faqApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    // get all faq
    faqs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FAQ_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFaq[], meta: IMeta) => {
        return {
          faqs: response,
          meta,
        };
      },
      providesTags: [tagTypes.faq],
    }),
    // get single faq
    faq: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FAQ_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq],
    }),
    // update faq
    updateFaq: build.mutation({
      query: (data) => ({
        url: `${FAQ_URL}/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.faq],
    }),
    // delete blog
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQ_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq],
    }),
  }),
});

export const {
  useAddFaqMutation,
  useFaqsQuery,
  useFaqQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqApi;
