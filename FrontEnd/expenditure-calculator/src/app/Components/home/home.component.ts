import { Component } from '@angular/core';
import { faCoffee, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  faCoffee = faCoffee;
  faPlus = faPlus
}
