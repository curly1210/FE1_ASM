import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private api: HttpClient) {}

  apiUrl: string = 'http://localhost:3000/products';
  products: any;

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.api.get(this.apiUrl).subscribe((res) => {
      this.products = res;
    });
  }
}
