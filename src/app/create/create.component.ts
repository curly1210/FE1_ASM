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
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-create',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  constructor(
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService
  ) {}

  private fb = inject(NonNullableFormBuilder);
  apiUrl: string = 'http://localhost:3000/products';

  categories = [
    { label: 'Iphone', value: 'iphone' },
    { label: 'Samsung', value: 'samsung' },
  ];

  validateForm = this.fb.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category: [null, Validators.required],
    image: ['', Validators.required],
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const data = this.validateForm.value;
      this.api.post(this.apiUrl, data).subscribe((res) => {
        if (res) {
          this.message.success('Thêm sản phẩm thành công');
          this.router.navigate(['']);
        }
      });
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
