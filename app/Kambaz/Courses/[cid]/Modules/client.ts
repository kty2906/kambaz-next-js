import axios from "axios";
import { Module } from "../../../Database/types";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/modules/${moduleId}`
  );
  return data;
};

export const updateModule = async (courseId: string, moduleId: string, module: Partial<Module>) => {
  const { data } = await axiosWithCredentials.put(
    `${COURSES_API}/${courseId}/modules/${moduleId}`,
    module
  );
  return data;
};