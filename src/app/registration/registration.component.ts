import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ExhibitorComponent } from '../exhibitor/exhibitor.component';
import { DataService } from '../services/data.service';
import { firstValueFrom } from 'rxjs';
import { CompletionModalComponent } from '../completion-modal/completion-modal.component';

@Component({
  selector: 'app-registration',
  imports: [
    CommonModule,
    ExhibitorComponent,
    FormsModule,
    CompletionModalComponent,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  exhibitors: any[] = [];
  companies: any[] = [];
  selectedCompany: string = '';
  selectedEvent: string = 'FHA-Food & Beverage';
  isSubmitting: boolean = false;
  showCompletionModal: boolean = false;
  fiveCode: string = '';
  formError: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getExhibitorCompanies().subscribe((data) => {
      if (data.status) this.companies = data.message;
    });
  }

  get filteredCompanies() {
    return this.companies.filter(
      (company) => company.S_event === this.selectedEvent
    );
  }

  addExhibitor(): void {
    this.exhibitors.push({});
  }

  removeExhibitor(index: number): void {
    this.exhibitors.splice(index, 1);
  }

  onEventChange(): void {
    this.selectedCompany = '';
    this.exhibitors = [];
  }

  onCompanySelect(): void {
    if (this.selectedCompany && this.exhibitors.length === 0) {
      this.addExhibitor();
      this.formError = '';
    }
  }

  onSubmit(form: NgForm): void {
    this.formError = '';

    if (this.exhibitors.length === 0) {
      this.formError = 'At least one exhibitor is required.';
      return;
    }

    let hasError = false;

    for (const exhibitor of this.exhibitors) {
      exhibitor.error1 = '';
      exhibitor.error = '';

      if (
        !exhibitor.email ||
        !exhibitor.name ||
        !exhibitor.jobTitle ||
        !exhibitor.country ||
        !exhibitor.company
      ) {
        exhibitor.error1 = '*All fields are mandatory.';
        hasError = true;
      } else if (!this.validateEmail(exhibitor.email)) {
        exhibitor.error = 'Invalid email address.';
        hasError = true;
      } else {
        exhibitor.error1 = '';
        exhibitor.error = '';
      }
    }

    if (hasError) {
      return;
    }

    this.fiveCode = this.generateRandomCode();

    this.isSubmitting = true;
    const requests = this.exhibitors.map((exhibitor) => {
      const payload = {
        S_added_via: 'Web Form',
        S_company: this.selectedCompany,
        S_email_address: exhibitor.email,
        S_group_reg_id: this.fiveCode,
        S_name_on_badge: exhibitor.name,
        S_job_title: exhibitor.jobTitle,
        S_country: exhibitor.country,
        S_company_on_badge: exhibitor.company,
        SB_event_fha: this.selectedEvent === 'FHA-Food & Beverage',
        SB_event_prowine: this.selectedEvent === 'Prowine Singapore',
      };

      return firstValueFrom(this.dataService.addExhibitor(payload)).catch(
        (error) => {
          exhibitor.error = error.error.message;
          return Promise.reject(error);
        }
      );
    });

    Promise.all(requests)
      .then(() => {
        this.isSubmitting = false;
        this.showCompletionModal = true;
      })
      .catch((error) => {
        this.formError = error.error.message;
        this.isSubmitting = false;
      });
  }

  closeCompletionModal(): void {
    this.showCompletionModal = false;
  }

  private validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  private generateRandomCode(): string {
    return Math.random().toString(36).substring(2, 7).toUpperCase();
  }
}
