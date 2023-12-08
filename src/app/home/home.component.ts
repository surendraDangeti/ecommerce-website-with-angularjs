import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { error } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

productsList : any
constructor(private _api:ApiCallService){

}
ngOnInit():void{
  this.GetProductsList()
}
private GetProductsList(){
  this._api.getAllProducts().subscribe({
    next: data =>{
      console.log(data)
      this.productsList  = data
      console.log("p", this.productsList.data)
    },
    error:error=>{
      console.log(error)
    }
  })
}

}
