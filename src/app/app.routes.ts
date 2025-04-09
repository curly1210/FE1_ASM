import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { LayoutClientComponent } from './layout-client/layout-client.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/Authe/auth.guard';
import { redirectIfLoggedInGuardGuard } from './guards/Logged/redirect-if-logged-in-guard.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutClientComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [redirectIfLoggedInGuardGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [redirectIfLoggedInGuardGuard],
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutAdminComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: ListComponent,
      },
      {
        path: 'create',
        component: CreateComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
    ],
  },
];
