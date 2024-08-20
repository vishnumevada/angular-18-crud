import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserAddUpdateComponent } from './components/user-add-update/user-add-update.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { UserComponent } from './components/user/user.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'create-user', component: UserAddUpdateComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'update-user/:id', component: UserAddUpdateComponent },
  { path: '**', component: PageNotFoundComponent },
];
