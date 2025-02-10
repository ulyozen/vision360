import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User, UserResponse } from '../../models/User';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { setAuthMessage } from '../../store/auth.actions';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  hide!: boolean;
  signUpForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit() {
    if (this.signUpForm.invalid) return console.log('invalid');

    const user = this.signUpForm.value as User;

    this.authService.signup(user).subscribe({
      next: (user: UserResponse) => {
        if (user.success) {
          this.store.dispatch(setAuthMessage( { message: "You have successfully registered!" } ))
          this.router.navigate(['/auth/signin']);
        }
      },
      error: error => console.error(error)
    })
  }
}
