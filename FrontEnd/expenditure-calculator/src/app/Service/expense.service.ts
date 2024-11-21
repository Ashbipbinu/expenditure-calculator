import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface, SignUpInterface, UserInterface } from '../interface/LoginInterface';

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
} 
