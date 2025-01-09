import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-exhibitor',
  standalone: true,
  imports: [],
  templateUrl: './exhibitor.component.html',
  styleUrls: ['./exhibitor.component.scss'],
})
export class ExhibitorComponent {
  @Input() index!: number;
}
