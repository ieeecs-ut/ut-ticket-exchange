import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [ 
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  { 
    path: "home", 
    component: LoginPageComponent, 
    pathMatch: "full"
  },
  { 
    path: "listings", 
    component: LoginPageComponent, 
    pathMatch: "full"
  },
  {
    path:"login",
    component: LoginPageComponent,
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
