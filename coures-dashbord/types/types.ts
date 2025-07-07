

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
