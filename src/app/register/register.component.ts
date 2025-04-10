import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.validateForm.get('password')?.valueChanges.subscribe(() => {
      this.validateForm.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  private fb = inject(NonNullableFormBuilder);
  apiUrl: string = 'http://localhost:3000/register';

  validateForm = this.fb.group({
    email: ['', Validators.required],
    phone: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: [
      '',
      [Validators.required, this.confirmPasswordValidator('password')],
    ],
  });

  confirmPasswordValidator(passwordName: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.parent) return null;

      const password = control.parent.get(passwordName)?.value;
      const confirmPassword = control.value;

      if (password !== confirmPassword) {
        return { notMatch: true };
      }

      return null;
    };
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const { confirmPassword, ...params } = this.validateForm.value;
      const data = { ...params, role: 'user' };

      this.auth.register(data);
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
