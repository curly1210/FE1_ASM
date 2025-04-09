import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) {}

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  isLoggedIn$ = this.loggedIn.asObservable();
  apiUrl: string = 'http://localhost:3000';

  private hasToken(): boolean {
    return !!localStorage.getItem('key');
  }

  register(data: any): void {
    this.api.post(`${this.apiUrl}/register`, data).subscribe({
      next: (res) => {
        this.message.success('Đăng ký thành công');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.message.error('Đăng ký thất bại');
      },
    });
  }

  login(data: any): void {
    this.api.post(`${this.apiUrl}/login`, data).subscribe({
      next: (res: any) => {
        this.message.success('Đăng nhập thành công');
        this.router.navigate(['/']);
        localStorage.setItem('key', res.accessToken);
        this.loggedIn.next(true); // ✅ notify all subscribers
      },
      error: (err) => {
        this.message.error('Sai tài khoản hoặc mật khẩu');
      },
    });
  }

  logout(): void {
    localStorage.removeItem('key');
    this.message.success('Đăng xuất thành công');
    this.router.navigate(['/']);
    this.loggedIn.next(false);
  }
}
