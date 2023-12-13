import { Component , OnInit} from '@angular/core';
import {ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RouterLink,  Router } from '@angular/router';
import { AuthDataService } from '../../services/auth-data.service';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authDataService: AuthDataService
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    const localData = JSON.parse(localStorage.getItem('authData') || '{}');
    if (localData && localData.token) {
      this.redirectHandler();
    }
  }

  ngOnInit() {}

  redirectHandler(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.signinForm.valid) {
      const formData = this.signinForm.value;
      const apiUrl = '/auth/signin';

      console.log('Form Data:', formData);

      this.http.post<any>(environment.apiUrl + apiUrl, formData)
        .subscribe(
          (response) => {
            console.log('User signed in successfully:', response);
            localStorage.setItem('authData', JSON.stringify(response.auth));
            this.authDataService.AuthData = true
            this.redirectHandler();
          },
          (error: HttpErrorResponse) => {
            console.error('Error signing in:', error);
            console.error(`Status: ${error.status}, Message: ${error.message}`);
          }
        );
    }
  }
}