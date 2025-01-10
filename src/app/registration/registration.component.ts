import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExhibitorComponent } from '../exhibitor/exhibitor.component';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ExhibitorComponent, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent {
  exhibitors: any[] = [];

  constructor() {
    this.exhibitors.push({});
  }

  addExhibitor(): void {
    this.exhibitors.push({});
    console.log(this.exhibitors);
  }

  removeExhibitor(index: number): void {
    this.exhibitors.splice(index, 1);
  }
}
