import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbackComponent } from './feedback/feedback.component';
import { ManagementComponent } from './management/management.component';
import { CustomerComponent } from './customer/customer.component';
import { AuthenticationGuard } from './core/authentication/authentication.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'management',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthenticationGuard] },
  {
    path: 'management',
    component: ManagementComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'management/customer',
    component: CustomerComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'management/customer/:id1',
    component: CustomerComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'management/customer/:id1/:id2',
    component: CustomerComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'management/customer/:id1/:id2/:id3',
    component: CustomerComponent,
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'management/customer/:id1/:id2/:id3/:id4',
    component: CustomerComponent,
    canActivate: [AuthenticationGuard]
  },
  { path: '**', redirectTo: 'management' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
