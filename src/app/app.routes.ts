import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.gurad';

export const routes: Routes = [
    { 
      path: '', redirectTo: 'auth', pathMatch: 'full' 
    },
    { 
      path: 'auth', component: AuthComponent 
    },
    { 
      path: 'home', component: HomeComponent,
      canActivate: [AuthGuard]
    },
    { 
      path: '**', redirectTo: 'home', pathMatch: 'full'
     }
  ];
