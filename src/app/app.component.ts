import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'exhibitor';
}
