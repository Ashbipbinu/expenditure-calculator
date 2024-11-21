export interface LoginInterface {
    email: string,
    password: string
}

export interface SignUpInterface extends LoginInterface{
    name: string,
    confirmPassword: string
}

export interface UserInterface extends SignUpInterface{
    _id: string
}