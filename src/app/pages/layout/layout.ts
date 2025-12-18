import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
})
export class Layout {
  private router = inject(Router);

  // Hardcoded user for the header
  userName = 'Admin User';

  onLogout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken');
    }
    this.router.navigate(['/login']);
  }
}
