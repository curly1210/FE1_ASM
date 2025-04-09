import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService,
    private auth: AuthService
  ) {}

  private fb = inject(NonNullableFormBuilder);
  apiUrl: string = 'http://localhost:3000/login';

  validateForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const data = this.validateForm.value;
      this.auth.login(data);

      // this.api.post(this.apiUrl, data).subscribe({
      //   next: (res: any) => {
      //     this.message.success('Đăng nhập thành công');
      //     this.router.navigate(['/']);
      //     localStorage.setItem('key', res.accessToken);
      //   },
      //   error: (err) => {
      //     this.message.error('Sai tài khoản hoặc mật khẩu');
      //   },
      // });
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
