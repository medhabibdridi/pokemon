import { Component, signal } from '@angular/core';
import { RouterOutlet} from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})

export class App {
  protected readonly title = signal('Mohamed habib Dridi - Pokemon App');

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/pokemon']);
  }
}
