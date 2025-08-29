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
  gpa: number
  courses?: string[] | null // Array of course IDs or null if no courses
  user: UserCreateDTO // UserCreateDTO object
}

export interface StudentReadDTO {
  studentID: string // uuid
  firstName: string
  lastName: string
  email: string
  role: string // UserReadDTO object
  gpa: number
  courses?: string[] | null // Array of course IDs or null if no courses
}

// export interface StudentWithAllInfoAndCoursesAndTeachersByStudenEmailDTO {
//   studentID: string // uuid
//   firstName: string
//   lastName: string
//   email: string
//   role: string // UserReadDTO object
//   gpa: number
//   courses?: CourseReadWithAllInfoDTO[] | null // Array of course IDs or null if no courses
// }

export interface StudentUpdateDTO {
  studentID: string // uuid
  gpa: number
  UserUpdateDTO: UserUpdateDTO // UserUpdateDTO object
}

export interface StudentUpdateBasicInfoDTO {
  studentID: string // uuid
  firstName: string
  lastName: string
  email: string
  role: string // UserReadDTO object
  gpa: number
}

type User = {
  firstName: string
  lastName: string
  email: string
  password: string
  role: string
  courses?: string[] | null
}

// TeacherUpdateBasicInfoDto
export type TeacherUpdateBasicInfoDto = {
  teacherID: string // UUID
  firstName: string
  lastName: string
  email: string
  role: string
}

// TeacherUpdateDTO
export type TeacherDTO = {
  teacherID: string // UUID
  firstName: string
  lastName: string
  email: string
  role: string
  courses?: string[] | null
}

export type CourseCreateDTO = {
  title: string // يجب أن يكون بطول بين 2 و100 حرف (تحقق يتم عادةً في الـ frontend أو backend)
  description: string // يجب أن يكون بطول بين 10 و500 حرف
  credits: number // عدد الساعات
  teacherID: string // UUID
}



export type CourseReadDTO = {
  courseID: string // Guid -> string
  title: string // length: 2–100
  description: string // length: 10–500
  credits: number
  teacherID: string // Guid -> string
  students: string[] // List<Student> -> Student[]
}

export type CourseUpdateDTO = {
  courseID: string
  title: string
  description: string
  credits: number
  teacherID: string
  // students?: Student[]; // إذا أردت إضافة الطلاب للتحديث
}

// for UserINterFace

// type Student = {
//   studentID: string;
//   gpa: number;
//   userID: string;
//   user: User;
//   courses: Course[];
// };






// for All Data for Current User 





// export type StudentWithAllInfoAndCoursesAndTeachersByStudenEmailDTO ={
//   studentID: string // uuid
//   user: UserReadDTO // UserReadDTO obj  
//   gpa: number
//   courses?: CourseReadWithAllInfoDTO[] | null // Array of course IDs or null if no courses
// }



// export type CourseReadWithAllInfoDTO = {
//   courseID: string // Guid -> string
//   title: string // length: 2–100
//   description: string // length: 10–500
//   credits: number
//   teacherID: string // Guid -> string
//   teacher: TeacherWithUser
//   students: StudentWithAllInfoAndCoursesAndTeachersByStudenEmailDTO[] // List<Student> -> Student[]
// }

// export type TeacherWithUser  ={

//   teacherID: string // uuid
//   user: UserReadDTO // UserReadDTO obj  
//   courses?: CourseReadWithAllInfoDTO[] | null // Array of course IDs or null if no courses
// }
// export interface UserReadDTO {
//   userID: string // uuid
//   firstName: string
//   lastName: string
//   email: string
//   role: string
// }



export interface UserReadDTO {
  userID: string
  firstName: string
  lastName: string
  email: string
  role: string
}

export type StudentWithUser = {
  studentID: string
  gpa: number
  user: UserReadDTO
  courses?: CourseReadWithAllInfoDTO[] | null
}

export type TeacherWithUser = {
  teacherID: string
  user: UserReadDTO
  courses?: CourseReadWithAllInfoDTO[] | null
}

export type CourseReadWithAllInfoDTO = {
  courseID: string
  title: string
  description: string
  credits: number
  teacherID: string
  teacher: TeacherDTO
  students: StudentWithUser[]
}





