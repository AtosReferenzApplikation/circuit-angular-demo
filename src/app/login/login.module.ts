import { Theme } from './../theme/symbols';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule } from '@angular/router';
import { ThemeModule, atosTheme, baTheme } from '../theme';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ThemeModule.forRoot({
      themes: [atosTheme, baTheme],
      active: 'atos'
    })
  ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
