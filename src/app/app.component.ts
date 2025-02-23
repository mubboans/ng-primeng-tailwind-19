import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from "./core/components/common/dashboard/dashboard.component";
@Component({
  selector: 'app-root',
  imports: [ButtonModule, RouterOutlet, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'primeng-tailwind-19';
  toggleDarkMode() {
    console.log('toogle');

    const element = document.querySelector('html');
    if (element) {
      console.log(element,'element');

      element.classList.toggle('my-app-dark');
    }
  }
}
