import axios from "axios";
import { Assignment } from "../../../Database/types";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const axiosWithCredentials = axios.create({ withCredentials: true });


export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`
  );
  return response.data;
};


export const updateAssignment = async (courseId: string, assignmentId: string, assignment: Assignment) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/assignments/${assignmentId}`,
    assignment
  );
  return data;
};