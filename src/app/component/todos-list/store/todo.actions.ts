import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Todo } from '../todos-list.component';

export const TodosActions = createActionGroup({
  source: 'Todos',
  events: {
    load: emptyProps(),
    loadSuccess: props<{ todos: Todo[] }>(),
    loadFailure: props<{ error: string }>(),

    edit: props<{ todo: Todo }>(),
    create: props<{ todo: Todo }>(),
    delete: props<{ id: number }>(),
  },
});
