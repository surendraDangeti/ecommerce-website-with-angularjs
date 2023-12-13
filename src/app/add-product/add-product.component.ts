import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule],
})

export class AddProductComponent implements OnInit {
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private httpClient: HttpClient,
    private router:  Router) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      image: ['', Validators.required],
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.productForm?.valid) {
      const formData = this.productForm.value;
      const apiUrl = '/add/products';
  
      this.httpClient.post(environment.apiUrl + apiUrl, formData)
        .subscribe(
          (response) => {
            console.log('Product added successfully:', response);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error('Error adding product:', error);
  
            if (error instanceof HttpErrorResponse) {
              console.error(`Status: ${error.status}, Message: ${error.message}`);
            } else {
              console.error('An unexpected error occurred:', error);
            }
          }
        );
    }
  }
  

  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement).files?.[0];

    if (file) {
      this.readFileAsBase64(file).then((base64String: string) => {
        console.log('Base64 String:', base64String);
        this.productForm.patchValue({ image: base64String });
        this.productForm.get('image')?.updateValueAndValidity();
      });
    }
  }

  private readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const result = reader.result;
        if (typeof result === 'string') {
          const base64String = result.split(',')[1] || result;
          resolve(base64String);
        } else {
          reject('Failed to read file as base64.');
        }
      };

      reader.onerror = () => {
        reject(reader.error);
      };

      reader.readAsDataURL(file);
    });
  }
}

