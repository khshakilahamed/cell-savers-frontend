import { IBlog, IFaq, IFeedback, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const FEEDBACK_URL = "/feedbacks";

export const feedbackApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.feedBack],
    }),
    // get all feedBack
    feedbacks: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: FEEDBACK_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IFeedback[], meta: IMeta) => {
        return {
          feedbacks: response,
          meta,
        };
      },
      providesTags: [tagTypes.feedBack],
    }),
    // get single feedback
    feedback: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.feedBack],
    }),
    // update feedBack
    updateFeedback: build.mutation({
      query: (data) => ({
        url: `${FEEDBACK_URL}/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.feedBack],
    }),
    // delete feedBack
    deleteFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.feedBack],
    }),
    // select feedBack
    selectFeedback: build.mutation({
      query: (id) => ({
        url: `${FEEDBACK_URL}/select-feedback/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.feedBack],
    }),
  }),
});

export const {
  useAddFeedbackMutation,
  useFeedbacksQuery,
  useFeedbackQuery,
  useUpdateFeedbackMutation,
  useDeleteFeedbackMutation,
  useSelectFeedbackMutation,
} = feedbackApi;
