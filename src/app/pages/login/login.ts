import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Custom Toast State using Signals
  toast = signal<{ message: string; type: 'success' | 'error' | null }>({
    message: '',
    type: null,
  });

  // Secure Form Configuration
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]], // Changed to 3 for '123'
  });

  handleLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      // HARDCODED SECURE CHECK
      if (email === 'crontex123@gmail.com' && password === '123') {
        // Show Success Toast
        this.showToast('Login Successful! Redirecting...', 'success');

        if (typeof window !== 'undefined') {
          localStorage.setItem('authToken', 'static-token-123');
        }

        // Redirect to Dashboard after a short delay to let them see the toast
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 1500);
      } else {
        this.showToast('Invalid credentials. Please try again.', 'error');
      }
    }
  }

  private showToast(message: string, type: 'success' | 'error') {
    this.toast.set({ message, type });

    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      this.toast.set({ message: '', type: null });
    }, 3000);
  }

  isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
