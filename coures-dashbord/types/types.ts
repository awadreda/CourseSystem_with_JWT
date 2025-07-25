


// User Types 


// types/user.ts

export interface UserReadDTO {
  userID: string // uuid
  firstName: string
  lastName: string
  email: string
  role: string
}

export interface UserUpdateDTO {
  userID: string // uuid
  firstName: string
  lastName: string
  email: string
  password: string | null
  role: string
}

export interface UserRegisterDTO {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}

export interface UserLoginDTO {
  email: string
  password: string
}

export interface UserCreateDTO {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
}


export interface StudentCreateDTO {
  gpa : number;
  courses? : string[] | null; // Array of course IDs or null if no courses
  user: UserCreateDTO; // UserCreateDTO object

}

export interface StudentReadDTO {
  studentID: string; // uuid
  firstName: string
  lastName: string
  email: string
  role: string// UserReadDTO object
  gpa: number;
  courses?: string[] | null; // Array of course IDs or null if no courses
}
export interface StudentUpdateDTO {
  studentID: string; // uuid
  gpa: number;
  UserUpdateDTO: UserUpdateDTO; // UserUpdateDTO object
}

export interface StudentUpdateBasicInfoDTO {
  studentID: string; // uuid
  firstName: string
  lastName: string
  email: string
  role: string// UserReadDTO object
  gpa: number;
  

}





type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  courses?: string[] | null;
};

// TeacherUpdateBasicInfoDto
 export type TeacherUpdateBasicInfoDto = {
  teacherID: string; // UUID
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

// TeacherUpdateDTO
export type TeacherDTO = {
  user: {
    userID: string; // UUID
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    courses?: string[] | null;
  };
};












