import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


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
    path: "dashboard", 
    component: DashboardComponent, 
    pathMatch: "full"
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
