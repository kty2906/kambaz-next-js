export interface Course {
    _id: string;
    name: string;
    number: string;
    startDate: string;
    endDate: string;
    department: string;
    credits: number;
    description: string;
  }
  
  export interface Lesson {
    _id: string;
    name: string;
    description: string;
    module: string;
  }
  
  export interface Module {
    _id: string;
    name: string;
    description: string;
    course: string;
    lessons?: Lesson[];
  }
  
  export interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    points: number;
    dueDate: string;
    availableDate: string;
  }
  
  export interface User {
    _id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    role: string;
    loginId: string;
    section: string;
    lastActivity: string;
    totalActivity: string;
  }
  
  export interface Enrollment {
    _id: string;
    user: string;
    course: string;
  }