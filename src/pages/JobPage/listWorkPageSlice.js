import { createSlice } from '@reduxjs/toolkit';

export const listWorkPageSlice = createSlice({
  name: 'listWorkPage',
  initialState: {
    listWork: [],
    lengthListWork: 0,
    typeJob: [],
    subTypeJob: [],
    idJob: '',
    workDetail: {},
  },
  reducers: {
    getListWorkPage: (state, action) => {
      state.lengthListWork = action.payload?.length;
      const chunkSize = 12;
      let chunk = [];
      for (let i = 0; i < action.payload.length; i += chunkSize) {
        chunk.push(action.payload.slice(i, i + chunkSize));
      }
      state.listWork = [...chunk];

      // state.listWork = action.payload;
    },
    getAllTypeJob: (state, action) => {
      state.typeJob = action.payload.map((typeJob) => ({
        id: typeJob._id,
        name: typeJob.name,
        subTypeJobs: typeJob.subTypeJobs.map((item) => ({
          key: item._id,
          label: item.name,
        })),
      }));
    },
    getWorkDetail: (state, action) => {
      state.workDetail = action.payload;
    },
    idUploadImage: (state, action) => {
      state.idJob = action.payload;
    },
    // setIdUploadImage: (state) => {
    //   state.idJob = '';
    // },
  },
});
export const listWorkPageActions = listWorkPageSlice.actions;
const listWorkPageReducer = listWorkPageSlice.reducer;
export default listWorkPageReducer;
