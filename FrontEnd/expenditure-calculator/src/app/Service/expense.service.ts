import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddNewExpenseInterface, CategoryAndPrice, LoginInterface, SignUpInterface, UserInterface } from '../interface/LoginInterface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }

  serverUrl:string = "http://localhost:3000/api"

  loginRequest(data: LoginInterface){
    return this.http.post<LoginInterface>(`${this.serverUrl}/auth/login`, data)
  }

  signupRequest(data: SignUpInterface){
    return this.http.post<SignUpInterface>(`${this.serverUrl}/auth/signup`, data)
  }

  getUserById(id: string){
    return this.http.get<UserInterface>(`${this.serverUrl}/user/get/${id}`) 
  }

  deleteUser(id: string){
    return this.http.get<any>(`${this.serverUrl}/user/delete/${id}`)
  }

  updateUser(data: UserInterface, id:string){
    return this.http.post<any>(`${this.serverUrl}/user/update/${id}`, data)
  }

  getUserId(){
    return localStorage.getItem('user_id')
  }

  setUserId(data:any){
    localStorage.setItem('user_id', data._id)
  }

  getAllCategory(){
    return this.http.get<string[]>(`${this.serverUrl}/expense/all-category`)
  }

  addNewCategoryAndPrice(data: AddNewExpenseInterface){
    return this.http.post<AddNewExpenseInterface>(`${this.serverUrl}/expense/category`, data)
  }

  deleteCategory(id : string){
    return this.http.get<any>(`${this.serverUrl}/expense/delete/${id}`)
  }

  addNewExpense(data: any){
    return this.http.post<any>(`${this.serverUrl}/expense/new-expense`, data)
  }
  
  getSummary(){
    return this.http.get<any>(`${this.serverUrl}/expense/get-summary`)
  }
} 
