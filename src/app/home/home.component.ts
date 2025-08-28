import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  imports: [
    TranslatePipe
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  yearsCount = 0;
  projectsCount = 0;
  deliveryCount = 0;

  private yearsTarget = 894;
  private projectsTarget = 8;
  private deliveryTarget = 98;

  ngOnInit(): void {
    this.animateCount('yearsCount', this.yearsTarget, 10);
    this.animateCount('projectsCount', this.projectsTarget, 1800);
    this.animateCount('deliveryCount', this.deliveryTarget, 1800);
  }

  private animateCount(property: 'yearsCount' | 'projectsCount' | 'deliveryCount', target: number, duration: number) {
    const stepTime = Math.max(Math.floor(duration / target), 10);
    let current = 0;
    const step = () => {
      if (current < target) {
        current++;
        this[property] = current;
        setTimeout(step, stepTime);
      } else {
        this[property] = target;
      }
    };
    step();
  }
}
