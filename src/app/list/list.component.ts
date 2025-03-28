import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-list',
  imports: [
    NzDividerModule,
    NzTableModule,
    RouterLink,
    CommonModule,
    NzButtonModule,
    NzPopconfirmModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(private api: HttpClient, private message: NzMessageService) {}

  apiUrl: string = 'http://localhost:3000/products';
  products: any;

  ngOnInit(): void {
    this.getList();
  }

  onDelete(id: number): void {
    this.api.delete(`${this.apiUrl}/${id}`).subscribe((res) => {
      this.message.success('Xóa thành công');
      this.getList();
    });
  }

  getList(): void {
    this.api.get(this.apiUrl).subscribe((res) => {
      this.products = res;
    });
    // console.log('ciong');
  }
}
