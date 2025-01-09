import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExhibitorComponent } from '../exhibitor/exhibitor.component';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ExhibitorComponent],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  exhibitors: number[] = [];

  addExhibitor() {
    this.exhibitors.push(this.exhibitors.length + 1);
  }
}
