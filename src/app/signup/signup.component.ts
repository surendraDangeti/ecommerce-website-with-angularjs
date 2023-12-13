import { Component, OnInit } from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validator ,Validators  } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.signupForm?.valid) {
      const formData = this.signupForm.value;
      const apiUrl = '/auth/signup';
      
      console.log("Form Data:", formData);

      this.http.post(environment.apiUrl + apiUrl, formData)
        .subscribe(
          (response: any) => {
            console.log('User registered successfully:', response);
          },
          (error: HttpErrorResponse) => {
            console.error('Error registering user:', error);

            console.error(`Status: ${error.status}, Message: ${error.message}`);
          }
        );
    }
  }
}