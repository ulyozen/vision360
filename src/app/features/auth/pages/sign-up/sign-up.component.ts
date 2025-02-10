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
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    })
  }

  onSubmit() {
    if (this.signUpForm.invalid) return

    const user = this.signUpForm.value as User

    this.authService.signup(user).subscribe((response: UserResponse) => {
      const { success, errors } = response
      const email = this.signUpForm.get('email')

      if (errors?.includes(`Email ${email!.value} already exists.`))
        return email!.setErrors({ userExists: true })

      if (!success) return

      this.store.dispatch(setAuthMessage( { message: 'You have successfully registered!' } ))
      this.router.navigate(['/auth/signin'])
    })
  }
}
