import { Routes } from '@angular/router';
import { UsersListComponent } from './component/users-list/users-list.component';
import { HeaderComponent } from './component/header/header.component';
import { ContentPageComponent } from './component/content-page/content-page.component';

export const routes: Routes = [
   {
      path: 'users',
      component: UsersListComponent,
   },
   {
      path: 'header',
      component: HeaderComponent,
   },
   {
      path: '',
      component: ContentPageComponent,
   }
];
