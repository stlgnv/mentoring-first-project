import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Todo } from '../todos-list.component';
import { NgIf } from '@angular/common';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

function completedValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'да' || value === 'нет') {
      return null;
    }
    return { invalidCompleted: true };
  };
}

@Component({
  selector: 'app-edit-todo-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit-todo-dialog.component.html',
  styleUrl: './edit-todo-dialog.component.scss',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
    MatDialogActions,
  ],
})
export class EditTodoDialogComponent {
  readonly data = inject<{ todo: Todo }>(MAT_DIALOG_DATA);

  constructor() {
    console.log(this.data);
  }

  private getCompletedValue(): boolean {
    const value = this.formTodo.get('completed')?.value!.trim().toLowerCase();
    if (value === 'да') return true;
    else return false;
  }

  private readonly fb = inject(FormBuilder);
  public readonly formTodo = this.fb.group({
    title: [
      this.data.todo.title,
      [Validators.required, Validators.minLength(4)],
    ],
    userId: [
      this.data.todo.userId,
      [Validators.required, Validators.pattern(/^\d+$/)],
    ],
    completed: [
      this.data.todo.completed ? 'да' : 'нет',
      [Validators.required, completedValidator()],
    ],
  });

  get todoWithUpdatedFields() {
    return {
      ...this.formTodo.value,
      id: this.data.todo.id,
      completed: this.getCompletedValue(),
    };
  }
  ngOnInit(): void {
    this.formTodo.patchValue({
      ...this.data.todo,
      completed: this.data.todo.completed ? 'да' : 'нет',
    });
  }
}
