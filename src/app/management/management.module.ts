import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import { ManagementComponent } from './management.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule, atosTheme, baTheme } from '../theme';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbCollapseModule,
    FontAwesomeModule,
    NgxSpinnerModule,
    ThemeModule.forRoot({
      themes: [atosTheme, baTheme],
      active: 'atos'
    })
  ],
  declarations: [
    ManagementComponent
  ]
})
export class ManagementModule { }
