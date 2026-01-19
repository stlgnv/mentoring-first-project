import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ICreateTodo } from '../todos-list.component';

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
  selector: 'app-create-todo-form',
  styleUrl: './create-todo-dialog.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create-todo-dialog.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
})
export class CreateTodoDialogComponent {
  private dialogRef = inject(MatDialogRef<CreateTodoDialogComponent>);
  private readonly fb = inject(FormBuilder);
  public readonly todoForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(4)]],
    userId: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    completed: ['', [Validators.required, completedValidator()]],
  });

  private getCompletedValue(): boolean {
    const value = this.todoForm.get('completed')?.value!.trim().toLowerCase();
    if (value === 'да') return true;
    else return false;
  }

  get todoToCreate(): ICreateTodo {
    return {
      title: this.todoForm.controls.title.value!,
      userId: Number(this.todoForm.controls.userId.value),
      completed: this.getCompletedValue(),
    };
  }

  public submitForm(): void {
    if (this.todoForm.invalid) return;
    this.dialogRef.close(this.todoToCreate);
  }
}
