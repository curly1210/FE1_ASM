import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-layout-admin',
  imports: [
    CommonModule,
    RouterOutlet,
    NzBreadCrumbModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    RouterLink,
  ],
  templateUrl: './layout-admin.component.html',
  styleUrl: './layout-admin.component.css',
})
export class LayoutAdminComponent {
  isCollapsed = false; // Thêm biến isCollapsed

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
