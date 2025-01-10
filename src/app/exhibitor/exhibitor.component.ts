import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { CustomSelectComponent } from '../custom-select/custom-select.component';

@Component({
  selector: 'app-exhibitor',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomSelectComponent],
  templateUrl: './exhibitor.component.html',
  styleUrls: ['./exhibitor.component.scss'],
})
export class ExhibitorComponent implements OnInit {
  @Input() index!: number;
  @Input() exhibitor!: any;
  @Input() error1: string = '';
  @Input() error: string = '';
  @Input() removeExhibitor!: (index: number) => void;

  countries: any[] = [];

  constructor(private dataService: DataService) {}

  getCountryNames(): string[] {
    return this.countries.map((country: { country: any }) => country.country);
  }

  ngOnInit(): void {
    this.dataService.getCountries().subscribe((data) => {
      const uniqueCountries = Array.from(
        new Set(data.map((a: any) => a.country))
      ).map((country) => {
        return data.find((a: any) => a.country === country);
      });
      this.countries = uniqueCountries;
    });
  }
}
