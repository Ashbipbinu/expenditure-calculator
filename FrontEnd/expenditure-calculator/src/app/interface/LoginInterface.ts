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

export interface CategoryAndPrice {
    category: string,
}

export interface AddNewExpenseInterface {
    name: string,
    amount: number,
    date: Date,
    categories: string[]
}
