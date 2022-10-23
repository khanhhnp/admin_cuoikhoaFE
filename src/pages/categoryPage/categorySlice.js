import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { categoryService } from "../../service/categoryService"
import { message } from "antd"

const initialState = {
  arrayTypeJobs: [],
}

export const setTypeJobsServiceThunk = createAsyncThunk(
  "categorySlice/fetchTypeJob",
  async () => {
    try {
      let response = await categoryService.getTypeJobList();
      // console.log("🚀 ~ file: categorySlice.js ~ line 13 ~ response", response);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const addTypeJobServiceThunk = createAsyncThunk(
  "categorySlice/addTypeJob",
  async (formData) => {
    try {
      let response = await categoryService.addTypeJob(formData);
      // console.log("🚀 ~ file: categorySlice.js ~ line 28 ~ response", response)
      if (response.status === 200) {
        message.success("Thêm TypeJob thành công !")
      } else {
        message.error("Thêm TypeJob thất bại!");
      }
    } catch (error) {
      console.log(error)
      message.error("Thêm TypeJob thất bại!");
    }
  }
)

export const updateTypeJobServiceThunk = createAsyncThunk(
  "categorySlice/updateTypeJob",
  async (params) => {
    try {
      if (params.values === null) {
        let response = await categoryService.updateTypeJob(params.id, params.values);
        // console.log("🚀 ~ file: categorySlice.js ~ line 46 ~ response", response)

        return response.data;
      }
      let response = await categoryService.updateTypeJob(params.id, params.values);
      // console.log("🚀 ~ file: categorySlice.js ~ line 51 ~ response", response)
      if (response.status === 200) {
        message.success("Cập nhật TypeJob thành công!");
      } else {
        message.error("Cập nhật TypeJob thất bại!");
      }
      
      return response.data;
    } catch (error) {
      console.log(error)
      message.error("Cập nhật TypeJob thất bại!");
    }
  }
)

export const deleteTypeJobServiceThunk = createAsyncThunk(
  "categorySlice/deleteTypeJob",
  async (id, thunkAPI) => {
    try {
      let response = await categoryService.deleteTypeJob(id);
      // console.log("🚀 ~ file: categorySlice.js ~ line 56 ~ response", response)
      if (response.status === 200) {
        message.success("Xóa TypeJob thành công");
      } else {
        message.error("Xóa TypeJob thất bại!");
      }
      thunkAPI.dispatch(setTypeJobsServiceThunk())
    } catch (error) {
      console.log(error)
      message.error("Xóa TypeJob thất bại!");
    }
  }
)


// SubTypeJob
export const addSubTypeJobServiceThunk = createAsyncThunk(
  "categorySlice/addSubTypeJob",
  async (formData) => {
    try {
      let response = await categoryService.addSubTypeJob(formData);
      // console.log("🚀 ~ file: categorySlice.js ~ line 75 ~ response", response)

      if (response.status === 200) {  
        message.success("Thêm SubTypeJob thành công !")
      } else {
        message.error("Thêm SubTypeJob thất bại!");
      }
    } catch (error) {
      console.log(error);
      message.error("Thêm SubTypeJob thất bại!");
    }
  }
)

export const uploadImageSubTypeJobServiceThunk = createAsyncThunk(
  "category/uploadImageSubTypeJob",
  async (id, imageFile) => {
    try {
      let response = await categoryService.uploadImageSubTypeJob(id, imageFile);
      // console.log("🚀 ~ file: categorySlice.js ~ line 93 ~ response", response)

      return response
    } catch (error) {
      console.log(error);
    }
  }
)

export const updateSubTypeJobServiceThunk = createAsyncThunk(
  "categorySlice/updateSubTypeJob", 
  async (params) => {
    try {
      if (params.values === null) {
        let response = await categoryService.updateSubTypeJob(params.id2, params.values);
        // console.log("🚀 ~ file: categorySlice.js ~ line 107 ~ response", response)
  
        return response.data;
      }
      let response = await categoryService.updateSubTypeJob(params.id2, params.values);
      // console.log("🚀 ~ file: categorySlice.js ~ line 107 ~ response", response)
      if (response.status === 200) {
        message.success("Cập nhật SubTypeJob thành công!");
      } else {
        message.error("Cập nhật SubTypeJob thất bại!");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      message.error("Cập nhật SubTypeJob thất bại!");
    }
  }
);

export const deleteSubTypeJobServiceThunk = createAsyncThunk(
  "categorySlice/deleteSubTypeJob",
  async (id, thunkAPI) => {
    try {
      let response = await categoryService.deleteSubTypeJob(id);
      // console.log("🚀 ~ file: categorySlice.js ~ line 95 ~ response", response)
      if (response.status === 200) {
        message.success("Xóa SubTypeJob thành công!")
      } else {
        message.error("Xóa SubTypeJob thất bại!");
      }
      thunkAPI.dispatch(setTypeJobsServiceThunk());
    } catch (error) {
      console.log(error)
      message.error("Xóa SubTypeJob thất bại!");
    }
  }
)

const categorySlice = createSlice({
  name: "categorySlice",
  initialState,
  extraReducers: {
    [setTypeJobsServiceThunk.fulfilled]: (state, action) => {
      state.arrayTypeJobs = action.payload;
    },
  }
})
const categoryReducer = categorySlice.reducer
export default categoryReducer;
