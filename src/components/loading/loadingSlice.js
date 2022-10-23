import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: { loading: false },
  reducers: {
    turnOnLoading: (state) => {
      state.loading = true;
    },
    turnOffLoading: (state) => {
      state.loading = false;
    },
  },
});

export const actionLoading = loadingSlice.actions;

const loadingReducer = loadingSlice.reducer;
export default loadingReducer;
