import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectMessage } from '../../store/auth.selectors';
import { cleanAuthMessage } from '../../store/auth.actions';
import { Subject, takeUntil } from 'rxjs';

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
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.signInForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required, Validators.minLength(3)],
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
