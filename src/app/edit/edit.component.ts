import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-edit',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    CommonModule,
  ],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  constructor(
    private api: HttpClient,
    private router: Router,
    private message: NzMessageService,
    private actRoute: ActivatedRoute
  ) {}

  private fb = inject(NonNullableFormBuilder);
  apiUrl: string = 'http://localhost:3000/products';
  id: number = 0;

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

  ngOnInit(): void {
    this.id = this.actRoute.snapshot.params['id'];
    this.getDetail();
  }

  getDetail(): void {
    this.api.get(`${this.apiUrl}/${this.id}`).subscribe((res) => {
      if (res) {
        this.validateForm.patchValue(res);
      }
    });
  }

  submitForm(): void {
    if (this.validateForm.valid) {
      const data = this.validateForm.value;
      this.api.put(`${this.apiUrl}/${this.id}`, data).subscribe((res) => {
        if (res) {
          this.message.success('Cập nhật sản phẩm thành công');
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
