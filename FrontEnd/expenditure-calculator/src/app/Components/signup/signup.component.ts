import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SignUpInterface } from '../../interface/LoginInterface';
import { ExpenseService } from '../../Service/expense.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  signupForm: FormGroup = new FormGroup({});

  constructor(private signUpService: ExpenseService){}

  ngOnInit(): void {
     this.signupForm  = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
     }, {
      validators: [this.passwordMatch] as ValidatorFn[]
    })
  }

  passwordMatch(formGroup: FormGroup): { [key: string]: boolean } | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(){
    this.signUpService.signupRequest(this.signupForm.value).subscribe(res => {
      console.log(res)
    })
  }

}
