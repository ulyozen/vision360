import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { User, UserResponse } from '../../models/User';
import { throttleTime } from 'rxjs';
import { setAuthMessage } from '../../store/auth.actions';

@Component({
  selector: 'app-forgot-password',
  standalone: false,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  hide!: boolean;
  forms!: FormGroup;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    })
  }

  onSubmit() {
    if (this.forms.invalid) return

    const user = this.forms.value as User;

    this.authService.forgotPassword(user)
      .pipe(throttleTime(2000))
      .subscribe((response: UserResponse) => {
        const { success, errors } = response
        const email = this.forms.get('email')

        if (errors?.includes(`Email ${email!.value} does not exist.`))
          return email!.setErrors({ userExists: true })

        if (!success) return

        this.store.dispatch(setAuthMessage( { message: 'Your password has been successfully reset!' } ))
        this.router.navigate(['/auth/signin'])
      })
  }
}
