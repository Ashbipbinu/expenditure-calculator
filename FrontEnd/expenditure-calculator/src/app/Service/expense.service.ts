import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface, SignUpInterface } from '../interface/LoginInterface';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(private http:HttpClient) { }

  serverUrl:string = "http://localhost:3000/api/auth"

  loginRequest(data: LoginInterface){
    return this.http.post<LoginInterface>(`${this.serverUrl}/login`, data)
  }

  signupRequest(data: SignUpInterface){
    return this.http.post<SignUpInterface>(`${this.serverUrl}/signup`, data)
  }
} 
