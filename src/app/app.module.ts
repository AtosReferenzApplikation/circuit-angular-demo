import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ManagementModule } from './management/management.module';
import { CustomerModule } from './customer/customer.module';
import { CoreModule } from './core';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared';
import { FeedbackModule } from './feedback/feedback.module';
import { SupportComponent } from './support/support.component';

@NgModule({
  declarations: [
    AppComponent,
    SupportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CoreModule,
    LoginModule,
    ManagementModule,
    CustomerModule,
    SharedModule,
    FeedbackModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
