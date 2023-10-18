import { baseApi } from "./api/baseApi";
import sidebarSlice from "./slices/sidebarSlice";

export const reducer = {
  sidebar: sidebarSlice,
  [baseApi.reducerPath]: baseApi.reducer,
};
