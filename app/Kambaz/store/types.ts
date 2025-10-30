import { Course, Module, Assignment, User } from "../Database/types";

export interface AccountState {
  currentUser: User | null;
}

export interface CoursesState {
  courses: Course[];
}

export interface ModulesState {
  modules: Module[];
}

export interface AssignmentsState {
  assignments: Assignment[];
}

export interface KambazState {
  accountReducer: AccountState;
  coursesReducer: CoursesState;
  modulesReducer: ModulesState;
  assignmentsReducer: AssignmentsState;
}
