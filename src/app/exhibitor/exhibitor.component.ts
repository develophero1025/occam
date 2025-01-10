import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-exhibitor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './exhibitor.component.html',
  styleUrls: ['./exhibitor.component.scss'],
})
export class ExhibitorComponent implements OnInit {
  @Input() index!: number;
  @Input() removeExhibitor!: (index: number) => void;
  @Input() exhibitor!: any;
  countries: any;

  constructor(private dataService: DataService) {}

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
