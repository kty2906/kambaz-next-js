import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { Course } from "../Database/types";

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
      state.courses = [...state.courses, newCourse] as Course[]; 
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter(
        (c: Course) => c._id !== action.payload  
      );
    },
    updateCourse: (state, action) => {
      state.courses = state.courses.map((c: Course) =>  
        c._id === action.payload._id ? action.payload : c
      ) as Course[];
    },
  },
});

export const { addCourse, deleteCourse, updateCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
