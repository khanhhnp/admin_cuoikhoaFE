import { createSlice } from "@reduxjs/toolkit";

export const listUserSlice = createSlice({
  name: "listUserPage",
  initialState: {
    listUser: [],
    lengthListUser: 0,
    idUser: "",
    userDetail: {},
  },
  reducers: {
    getUserList: (state, action) => {
      state.lengthListUser = action.payload?.length;
      const chunkSize = 12;
      let chunk = [];
      for (let i = 0; i < action.payload.length; i += chunkSize) {
        chunk.push(action.payload.slice(i, i + chunkSize));
      }
      state.listUser = [...chunk];
    },
    getUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
  },
});
export const listUserActions = listUserSlice.actions;
const listUserReducer = listUserSlice.reducer;
export default listUserReducer;
