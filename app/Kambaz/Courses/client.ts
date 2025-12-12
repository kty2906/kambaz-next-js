import axios from "axios";
import { Course } from "../Database/types";
import { Module } from "../Database/types";
import { Assignment } from "../Database/types";

const axiosWithCredentials = axios.create({ withCredentials: true });

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const COURSES_API = `${HTTP_SERVER}/api/courses`;
export const USERS_API = `${HTTP_SERVER}/api/users`;

// Course CRUD operations
export const fetchAllCourses = async () => {
  try {
    console.log("[fetchAllCourses] Calling:", COURSES_API);
    const { data } = await axiosWithCredentials.get(COURSES_API);
    console.log("[fetchAllCourses] Success, received", data?.length || 0, "courses");
    return data;
  } catch (error: unknown) {
    console.error("[fetchAllCourses] Error:", error);
    if (axios.isAxiosError(error)) {
      console.error("[fetchAllCourses] Status:", error.response?.status);
      console.error("[fetchAllCourses] URL:", error.config?.url);
      console.error("[fetchAllCourses] Response:", error.response?.data);
      if (error.response?.status === 401) {
        console.error("[fetchAllCourses] 401 Unauthorized - Session may have expired");
      }
    }
    throw error;
  }
};

export const createCourse = async (course: Partial<Course>) => {
  const { data } = await axiosWithCredentials.post(COURSES_API, course);
  return data;
};

export const updateCourse = async (courseId: string, course: Partial<Course>) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}`, course);
  return data;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return data;
};

export const findCourseById = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}`);
  return data;
};

// Enrollment operations
export const findCoursesForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/courses`);
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
};

export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return data;
};


export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/modules`);
  return data;
};

export const createModuleForCourse = async (courseId: string, module: Partial<Module>) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/modules`, module);
  return data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
  return data;
};

export const updateModule = async (courseId: string, moduleId: string, module: Partial<Module>) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${moduleId}`, module);
  return data;
};

// Assignments operations
export const findAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return data;
};

export const createAssignment = async (courseId: string, assignment: Partial<Assignment>) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return data;
};

export const updateAssignment = async (courseId: string, assignmentId: string, assignment: Partial<Assignment>) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/assignments/${assignmentId}`, assignment);
  return data;
};

export const deleteAssignment = async (courseId: string, assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/assignments/${assignmentId}`);
  return data;
};
