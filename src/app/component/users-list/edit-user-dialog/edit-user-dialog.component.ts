import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { IUser } from '../users-list.component';

@Component({
  standalone: true,
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrl: './edit-user-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatError,
    MatInputModule,
    MatButtonModule,
    MatDialogClose,
    MatDialogActions,
  ],
})

export class EditUserDialogComponent {
  readonly data = inject<{ user: IUser }>(MAT_DIALOG_DATA);

  public form = new FormGroup({
  name: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(2)],
  }),

  email: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.email],
  }),

  website: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3)],
  }),

  company: new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)],
    }),

  }),
  phone: new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(3),Validators.pattern(/^\d+$/)],
  }),

});

  get userWithUpdatedFields() {
    return {
      ...this.form.value,
      id: this.data.user.id,
    };
  }

  ngOnInit(): void {
    this.form.patchValue(this.data.user);
  }
}
