import { Component, NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthDataService } from '../services/auth-data.service';
import { NavbarComponent } from './navbar/navbar.component';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule,  NavbarComponent ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {
  title = 'angular-tour-of-heroes';
  noOfitems: any = "";
  showlogoutoption: boolean = false;

  constructor(private authDataService: AuthDataService) { }



  ngOnInit() {
      this.checkAuthData();
   
  }

  private checkAuthData() {
      this.showlogoutoption = this.authDataService.getLocalStorageData()
    
  }

  signoutHandler() {
    localStorage?.removeItem("authData");
    this.showlogoutoption = false;
  }
}
