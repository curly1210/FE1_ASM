import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  imports: [
    NzDividerModule,
    NzTableModule,
    RouterLink,
    CommonModule,
    NzButtonModule,
    NzPopconfirmModule,
    FormsModule,
    NzButtonModule,
    NzInputModule,
    NzIconModule,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  constructor(private api: HttpClient, private message: NzMessageService) {}

  apiUrl: string = 'http://localhost:3000/products';
  products: any; // lưu danh sách lọc
  allProducts: any; //  lưu danh sách gốc
  searchValue: string = '';
  search$ = new Subject<string>();

  ngOnInit(): void {
    this.getList();

    this.search$.pipe(debounceTime(500)).subscribe((value) => {
      this.searchValue = value;
      this.onSearch(); // gọi hàm lọc khi user ngừng gõ
    });
  }

  onDelete(id: number): void {
    this.api.delete(`${this.apiUrl}/${id}`).subscribe((res) => {
      this.message.success('Xóa thành công');
      this.getList();
    });
  }

  getList(): void {
    this.api.get(this.apiUrl).subscribe((res) => {
      this.allProducts = res;
      this.products = res;
    });

    // console.log('ciong');
  }

  onSearch(): void {
    const keyword = this.removeVietnameseTones(this.searchValue.toLowerCase());
    console.log(keyword);
    this.products = this.allProducts.filter((item: any) =>
      this.removeVietnameseTones(item.name.toLowerCase()).includes(keyword)
    );
  }

  removeVietnameseTones(str: string): string {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  }
}
