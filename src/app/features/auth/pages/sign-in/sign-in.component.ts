import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectMessage } from '../../store/auth.selectors';
import { cleanAuthMessage } from '../../store/auth.actions';
import { Subject, takeUntil, throttleTime } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User, UserResponse } from '../../models/User';
import { setAuthenticated } from '../../../../core/store/header/header.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: false,
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit, OnDestroy {
  hide!: boolean;
  signInForm!: FormGroup;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      rememberMe: [false]
    })
  }

  ngOnInit(): void {
    this.showMessage()
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }

  onSubmit() {
    if (this.signInForm.invalid) return

    const user = this.signInForm.value as User

    this.authService.signin(user)
      .pipe(throttleTime(2000))
      .subscribe((response: UserResponse) => {
        const { success, errors, token } = response

        const email = this.signInForm.get('email')
        const password = this.signInForm.get('password')

        if (errors?.includes(`Email ${email!.value} does not exist.`))
          email!.setErrors({ userExists: true })

        if (errors?.includes('Incorrect password.'))
          password!.setErrors({ incorrect: true })

        if (!success || !token) return

        const { accessToken, expiresIn } = token
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('tokenExpiration', (Date.now() + expiresIn * 1000).toString())

        this.store.dispatch(setAuthenticated())
        this.router.navigate(['/'])
      })
  }

  onForgotPassword() {
    this.router.navigate(['/auth/forgot-password'])
  }

  showMessage(duration = 4000) {
    this.store
      .select(selectMessage)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((message) => {
        if (message) {
          this.snackBar.open(message, 'OK', {
            duration: duration,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }

        setTimeout(() => {
          this.store.dispatch(cleanAuthMessage())
        }, duration)
    })
  }
}
