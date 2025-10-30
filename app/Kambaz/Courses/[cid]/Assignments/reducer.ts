import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { Assignment } from "../../../Database/types";

const initialState = {
  assignments: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      const newAssignment = {
        ...action.payload,
        _id: new Date().getTime().toString(),
      };
      state.assignments = [...state.assignments, newAssignment] as Assignment[];
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (a: Assignment) => a._id !== action.payload
      );
    },
    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((a: Assignment) =>
        a._id === action.payload._id ? action.payload : a
      ) as Assignment[];
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = 
  assignmentsSlice.actions;
export default assignmentsSlice.reducer;