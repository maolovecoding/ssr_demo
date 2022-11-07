import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getDemoData = createAsyncThunk(
  "demo/getData",
  async (initData: string) => {
    const res = await axios.post("http://localhost:3000/api/getDemoData", {
      content: initData,
    });
    return res.data?.data?.content;
  }
);

const demoReducer = createSlice({
  name: "demo", // 是这个 reducer 的空间，后面取 store 的时候会根据这个进行区分；
  // state
  initialState:
    typeof window !== "undefined"
      ? (window as any)?.context?.state?.demo
      : { content: "我是默认值 ～～～" },
  // 同步reducer
  reducers: {},
  // 异步reducer
  extraReducers(build) {
    // 这个是我们这里需要的异步 reducer，其中包含三个状态，pending、fulfilled 和 rejected，分别对应到请求的三种状态
    build
      .addCase(getDemoData.pending, (state, action) => {
        state.content = "pending";
      })
      .addCase(getDemoData.fulfilled, (state, action) => {
        state.content = action.payload;
      })
      .addCase(getDemoData.rejected, (state, action) => {
        state.content = "rejected";
      });
  },
});
export { demoReducer, getDemoData };
