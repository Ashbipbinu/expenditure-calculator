import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { SignUpInterface } from '../../interface/LoginInterface';
import { ExpenseService } from '../../Service/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit{

  signupForm: FormGroup = new FormGroup({});

  constructor(private signUpService: ExpenseService, private router: Router){}

  ngOnInit(): void {
     this.signupForm  = new FormGroup({
      name: new FormControl('', [Validators.minLength(3), Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
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
    if(this.signupForm.valid){
      this.signUpService.signupRequest(this.signupForm.value).subscribe(res => {
        if(res){
          this.router.navigate(['/'])
        }
      })
    }
  }

}
