import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'FE1_ASM';

  // isLoggedIn = false;

  // ngOnInit(): void {
  //   const token = localStorage.getItem('key');
  //   this.isLoggedIn = !!token;
  // }

  // logout(): void {
  //   localStorage.removeItem('key'); // Xóa token
  //   this.isLoggedIn = false;
  //   window.location.href = '/';
  // }
}
