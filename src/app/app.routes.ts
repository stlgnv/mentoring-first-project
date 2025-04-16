import { Routes } from '@angular/router';
import { UsersListComponent } from './component/users-list/users-list.component';
import { ContentPageComponent } from './component/content-page/content-page.component';
import { TodosListComponent } from './component/todos-list/todos-list.component';

export const routes: Routes = [
   {
      path: 'users',
      component: UsersListComponent,
   },
   {
      path: '',
      component: ContentPageComponent,
   },
   {
      path: 'todos',
      component: TodosListComponent
   }
];
