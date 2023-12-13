import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ApiCallService } from '../../services/api-call.service';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-adminpanel',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.css'
})





export class AdminpanelComponent implements OnInit {

  displayedColumns: string[] = ["id", "clientId", "created_at", "productId", "quantity"];
  dataSource: any; 
  orderList: any;
users: CdkTableDataSourceInput<any> | undefined;

  constructor(private authService: AuthService, private _api: ApiCallService,
private router:  Router ) { 


}

  getOrdersListApiCall() {
    
    this._api.getAllorders().subscribe({
      next: (data) => {
        this.orderList = data;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
   
    this.getOrdersListApiCall();
    this.dataSource = new MatTableDataSource<UserData>(this.orderList);
    if(this.authService.isAuthenticated()){ 
  }else{
      this.router.navigate(['/']);
    }
  }
}

