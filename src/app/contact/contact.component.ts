import { Component } from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  currentStep = 1;
  steps = [1, 2, 3, 4];


  formData = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  get charCount(): number {
    return this.formData.message.length;
  }

  nextStep() {
    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  submitForm() {
    const formspreeURL = 'https://formspree.io/f/xldbaeep'; // Ersetze 'yourFormId'

    const formData = {
      name: this.formData.name,
      email: this.formData.email,
      phone: this.formData.phone,
      message: this.formData.message
    };

    fetch(formspreeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(response => {
        if (response.ok || response.success !== false) {
          alert('Nachricht erfolgreich gesendet!');
          this.currentStep = 1;
          this.formData = { name: '', email: '', phone: '', message: '' };
        } else {
          alert('Fehler beim Senden: ' + (response.error || 'Unbekannter Fehler'));
        }
      })
      .catch(error => {
        console.error('Fehler:', error);
        alert('Fehler beim Senden.');
      });
  }



  isStepActive(step: number): boolean {
    return this.currentStep === step;
  }
}
