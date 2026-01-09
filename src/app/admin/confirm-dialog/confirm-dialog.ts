import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss']
})
export class ConfirmDialogComponent {

  @Input() message = "Tem certeza?";
  @Input() loading = false;

  @Output() confirmAction = new EventEmitter<void>();
  @Output() cancelAction = new EventEmitter<void>();

  confirm() {
    this.confirmAction.emit();
  }

  cancel() {
    this.cancelAction.emit();
  }
}
