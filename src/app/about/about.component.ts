import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {NgForOf, NgStyle} from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './about.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  styleUrl: './about.component.css'
})
export class AboutComponent {
  skills = [
    { name: 'Web Design', percent: 80, color: '#22C55E' },      // Tailwind green-500
    { name: 'Mobile App', percent: 95, color: '#8B5CF6' },       // Tailwind violet-500
    { name: 'Illustrator', percent: 65, color: '#3B82F6' },      // Tailwind blue-500
    { name: 'Photoshop', percent: 75, color: '#E879F9' }         // Tailwind fuchsia-400
  ];
}
