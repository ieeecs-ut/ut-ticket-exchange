import { BiddingModalComponent } from './bidding-modal/bidding-modal.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ContactmodalComponent } from './contactmodal/contactmodal.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  { 
    path: "listings", 
    component: DashboardComponent, 
    pathMatch: "full",
    data: { title: "Dashboard" }
  },
  {
    path:"home",
    component: LoginPageComponent,
    pathMatch: "full",
    data: { title: "Home" }
  },
  {
    path: "contact",
    component: LoginPageComponent,
    pathMatch: "full" ,
    data: { title: "Contact" }
  },
   {
     path: "auth",
     component: AuthPageComponent,
     pathMatch: "full"
   },
   {
     path: "bidding",
     component: BiddingModalComponent,
     pathMatch: "full"
   },
   { path: '**', redirectTo: '/home', pathMatch: 'full' },

  // {

  //   component: ContactUsButtonComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
