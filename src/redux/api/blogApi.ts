import { IBlog, IMeta } from "@/types/global";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const BLOG_URL = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // get all blogs
    blogs: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: BLOG_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IBlog[], meta: IMeta) => {
        return {
          blogs: response,
          meta,
        };
      },
      providesTags: [tagTypes.blog],
    }),
    // get single blog
    blog: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${BLOG_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog],
    }),
    // update blog
    updateBlog: build.mutation({
      query: (data) => ({
        url: `${BLOG_URL}/${data.id}`,
        method: "PATCH",
        data: data.updatedData,
      }),
      invalidatesTags: [tagTypes.blog],
    }),
    // delete blog
    deleteBlog: build.mutation({
      query: (id) => ({
        url: `${BLOG_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog],
    }),
  }),
});

export const {
  useAddBlogMutation,
  useBlogsQuery,
  useBlogQuery,
  useDeleteBlogMutation,
  useUpdateBlogMutation,
} = blogApi;
