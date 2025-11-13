import axios from "axios";
import { Assignment } from "../../../Database/types";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: Assignment) => {
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignment._id}`,
    assignment
  );
  return data;
};