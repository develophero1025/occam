import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ExhibitorComponent } from '../exhibitor/exhibitor.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-registration',
  imports: [CommonModule, ExhibitorComponent, FormsModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  exhibitors: any[] = [];
  companies: any[] = [];
  selectedCompany: string = '';

  constructor(private dataService: DataService) {
    // this.exhibitors.push({});
  }

  ngOnInit(): void {
    this.dataService.postExhibitorCompanies().subscribe((data) => {
      if (data.status) this.companies = data.message;
      console.log('Companies:', this.companies);
    });
  }

  addExhibitor(): void {
    this.exhibitors.push({});
    console.log('exhibitors=>', this.exhibitors);
  }

  removeExhibitor(index: number): void {
    this.exhibitors.splice(index, 1);
  }

  onCompanySelect(): void {
    if (this.selectedCompany && this.exhibitors.length === 0) {
      this.addExhibitor();
    }
  }

  onSubmit(form: NgForm): void {
    console.log('Form Submitted!', form.value);
    console.log('Exhibitors:', this.exhibitors);
  }
}
