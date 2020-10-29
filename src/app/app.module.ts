import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppointmentModule } from './modules/appointment/appointment.module';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './shared/components/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppointmentModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
