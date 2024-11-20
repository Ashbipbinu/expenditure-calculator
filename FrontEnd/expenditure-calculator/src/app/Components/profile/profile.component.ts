import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});

  constructor() { }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });

    // this.userService.getUserProfile().subscribe((data) => {
    //   this.profileForm.patchValue(data);
    // });
  }

  updateProfile() {
    // if (this.profileForm.valid) {
    //   this.userService.updateUserProfile(this.profileForm.value).subscribe((data) => {
    //     console.log(data);
    //   });
    // }
  }

  deleteProfile() {
    // this.userService.deleteUserProfile().subscribe((data) => {
    //   console.log(data);
    // });
  }
}