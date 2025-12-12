import axios from "axios";
import { User } from "../Database/types";
import { Course } from "../Database/types";

export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
export const USERS_API = `${HTTP_SERVER}/api/users`;
export const COURSES_API = `${HTTP_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({ 
  withCredentials: true,
  baseURL: HTTP_SERVER,
});

// Add request interceptor for debugging
axiosWithCredentials.interceptors.request.use(
  (config) => {
    console.log('[Axios Request]', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosWithCredentials.interceptors.response.use(
  (response) => {
    console.log('[Axios Response]', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('[Axios Error]', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message,
    });
    return Promise.reject(error);
  }
);

interface Credentials {
  username?: string;
  password?: string;
}

export const signin = async (credentials: Credentials) => {
  const response = await axiosWithCredentials.post(
    `/api/users/signin`,
    credentials
  );
  return response.data;
};

export const profile = async () => {
  const response = await axiosWithCredentials.get(`/api/users/profile`); 
  return response.data;
};

export const signup = async (user: Partial<User>) => {
  const response = await axiosWithCredentials.post(`/api/users/signup`, user);
  return response.data;
};

export const signout = async () => {
  const response = await axiosWithCredentials.post(`/api/users/signout`);
  return response.data;
};

export const updateUser = async (user: User) => {
  const response = await axiosWithCredentials.put(
    `/api/users/${user._id}`,
    user
  );
  return response.data;
};

export const findMyCourses = async () => {
  try {
    const url = `/api/users/current/courses`;
    console.log("[findMyCourses] Calling:", url);
    const { data } = await axiosWithCredentials.get(url);
    console.log("[findMyCourses] Success, received", data?.length || 0, "courses");
    return data;
  } catch (error: unknown) {
    console.error("[findMyCourses] Error:", error);
    if (axios.isAxiosError(error)) {
      console.error("[findMyCourses] Status:", error.response?.status);
      console.error("[findMyCourses] URL:", error.config?.url);
      console.error("[findMyCourses] Response:", error.response?.data);
    }
    throw error;
  }
};

export const createCourse = async (course: Partial<Course>) => {
  const { data } = await axiosWithCredentials.post(`/api/courses`, course);
  return data;
};

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(`/api/courses`);
  return data;
};

export const deleteCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`/api/courses/${courseId}`);
  return data;
};

export const updateCourse = async (courseId: string, course: Partial<Course>) => {
  const { data } = await axiosWithCredentials.put(`/api/courses/${courseId}`, course);
  return data;
};

export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(`/api/users`);
  return response.data;
};

export const findUsersByRole = async (role: string) => {
  const response = await axiosWithCredentials.get(`/api/users?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axiosWithCredentials.get(`/api/users?name=${name}`);
  return response.data;
};

export const findUserById = async (id: string) => {
  const response = await axiosWithCredentials.get(`/api/users/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosWithCredentials.delete(`/api/users/${userId}`);
  return response.data;
};

export const createUser = async (user: Partial<User>) => {
  const response = await axiosWithCredentials.post(`/api/users`, user);
  return response.data;
};