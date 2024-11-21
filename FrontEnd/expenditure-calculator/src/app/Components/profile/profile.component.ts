import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpenseService } from '../../Service/expense.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  id:any

  constructor(private profileService: ExpenseService, private router: Router) { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.id = this.profileService.getUserId()
  
    this.profileService.getUserById(this.id).subscribe((data) => {
      this.profileForm.patchValue(data);
    });
  }

  updateProfile() {
    if (this.profileForm.valid) {
      this.profileService.updateUser(this.profileForm.value, this.id).subscribe((data) => {
        console.log(data);
      });
    }
  }

  deleteProfile() {
    this.profileService.deleteUser(this.id).subscribe((data) => {
      if(data){
        this.router.navigate(['/signup'])
      }
    });
  }
}