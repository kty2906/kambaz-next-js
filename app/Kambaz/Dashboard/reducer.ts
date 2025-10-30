import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";

const initialState = {
  courses: courses,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      const newCourse = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.courses = [...state.courses, newCourse];
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c: any) => c._id !== action.payload);
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((c: any) =>
        c._id === action.payload._id ? action.payload : c
      );
    },
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
  },
});
export const { addCourse, deleteCourse, updateCourse, setCourse } = coursesSlice.actions;
export default coursesSlice.reducer;