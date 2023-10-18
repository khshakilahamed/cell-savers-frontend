import { createSlice } from "@reduxjs/toolkit";

export interface SidebarState {
  open: boolean;
}

const initialState: SidebarState = {
  open: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    showSidebarDrawer: (state) => {
      state.open = true;
    },
    onSidebarClose: (state) => {
      state.open = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { showSidebarDrawer, onSidebarClose } = sidebarSlice.actions;

export default sidebarSlice.reducer;
