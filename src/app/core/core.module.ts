import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationGuard } from './authentication/authentication.guard';
import { AuthenticationService } from './authentication/authentication.service';
import { NavigationComponent } from './navigation/navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatIconModule,
  MatGridListModule, MatRippleModule } from '@angular/material';
import { ThemeModule, atosTheme, baTheme } from '../theme';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    RouterModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    ThemeModule.forRoot({
      themes: [atosTheme, baTheme],
      active: 'atos'
    })
  ],
  declarations: [
    NavigationComponent
  ],
  exports: [
    NavigationComponent,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule
  ],
  providers: [
    AuthenticationGuard,
    AuthenticationService
  ]
})
export class CoreModule { }
