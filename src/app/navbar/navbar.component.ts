import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthDataService } from '../../services/auth-data.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../auth.service';
import { MatIconModule } from '@angular/material/icon';
import { cilList, cilShieldAlt } from '@coreui/icons';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, ReactiveFormsModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  
 
})
export class NavbarComponent implements OnInit {
  title = 'angular-tour-of-heroes';
  noOfitems: any = "";
  showLogoutOption: boolean = false;
  userName: any = "";
  isNavActive: boolean = false;
  icons = { cilList, cilShieldAlt };

  constructor(
    private authDataService: AuthDataService,
    private authStatus: AuthService
  ) {}

  ngOnInit() {
    this.checkAuthData();
  }

  private checkAuthData() {
    if (this.authStatus.isAuthenticated()) {
      this.showLogoutOption = this.authDataService.AuthData;
      this.userName = this.authDataService.AuthData.username;
    }
  }

  signoutHandler() {
    this.showLogoutOption = false;
      localStorage?.removeItem("authData");
  }

  toggleNav() {
    this.isNavActive = !this.isNavActive;
    console.log("workinggg")
  }
}

