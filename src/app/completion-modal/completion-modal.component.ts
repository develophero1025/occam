import { Component, EventEmitter, Output, Input } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-completion-modal',
  imports: [],
  templateUrl: './completion-modal.component.html',
  styleUrl: './completion-modal.component.scss',
})
export class CompletionModalComponent {
  @Input() fiveCode: string = '';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  saveImage(): void {
    const modalContent = document.querySelector(
      '.modal-content'
    ) as HTMLElement;
    html2canvas(modalContent).then((canvas) => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'registration-code.png';
      link.click();
    });
  }
}
