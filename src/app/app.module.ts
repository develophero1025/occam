import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { ExhibitorComponent } from './exhibitor/exhibitor.component';

@NgModule({
  declarations: [AppComponent, RegistrationComponent, ExhibitorComponent],
  imports: [BrowserModule, AppRoutingModule, CommonModule],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
