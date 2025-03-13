import { Routes } from '@angular/router';
import { UsersListComponent } from './component/users-list/users-list.component';
import { ContentPageComponent } from './component/content-page/content-page.component';

export const routes: Routes = [
   {
      path: 'users',
      component: UsersListComponent,
   },
   {
      path: '',
      component: ContentPageComponent,
   }
];
