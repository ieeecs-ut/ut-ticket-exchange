import { ContactUsButtonComponent } from './contact-us-button/contact-us-button.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeButtonComponent } from './home-button/home-button.component';


const routes: Routes = [ 
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full'
  },
  { 
    path: "login", 
    component: LoginPageComponent, 
    pathMatch: "full"
  },
  { 
    path: "listings", 
    component: DashboardComponent, 
    pathMatch: "full"
  },
  {
    path:"home",
    component: HomeButtonComponent,
    pathMatch: "full"
  }
  // {

  //   component: ContactUsButtonComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
