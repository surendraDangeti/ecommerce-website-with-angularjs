import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ViewProdcutComponent } from './view-prodcut/view-prodcut.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';



export const routes: Routes = [
    {
        path:'',
        component: HomeComponent ,
        title: "Home"
    },
    {
        path:'cart',
        component:CartComponent,
        title: "cart"
        
    },
    {
      path:'addproduct',
      component:AddProductComponent,
      title: "Add product"
    },
    { path: 'product/:id', component: ViewProdcutComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    {
      path:'admin/dashboard',
      component: AdminpanelComponent ,
      title: "dashboard"
  },
    {
      path: "**",
      component:NotFoundComponent,
      title:"NotFound"
    }
];
