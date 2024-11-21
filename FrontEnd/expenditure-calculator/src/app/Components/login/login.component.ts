import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../Service/expense.service';
import { LoginInterface } from '../../interface/LoginInterface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private authService: ExpenseService, private router: Router){}

  loginForm: FormGroup = new FormGroup({});
  error:string = ''

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required)
    })
  }



  onSubmit() {

    if (this.loginForm.valid) {
      this.authService.loginRequest(this.loginForm.value).subscribe((res) => {
        if(res){
          this.authService.setUserId(res)
          this.router.navigate(['/home/dashboard'])
        }
         this.error = "Invalid credentials"
      },(error) =>  this.error = error.error.message)
    } 
  }

}
