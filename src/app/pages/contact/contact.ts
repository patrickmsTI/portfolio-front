import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmailPayload, EmailService } from '../../services/email.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactComponent {
  model: EmailPayload = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  sending = false;
  sent = false;
  error = '';

  constructor(private emailService: EmailService) {}

  send(form: NgForm) {
    if (form.invalid || this.sending) return;

    this.sending = true;
    this.sent = false;
    this.error = '';

    this.emailService.send(this.model).subscribe({
      next: () => {
        this.sending = false;
        this.sent = true;
        form.resetForm();
      },
      error: () => {
        this.sending = false;
        this.error = 'Erro ao enviar email.';
      }
    });
  }
}
