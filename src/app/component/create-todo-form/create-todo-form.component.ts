import { NgIf } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Output } from "@angular/core";
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function completedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value?.trim().toLowerCase();
        if (value === 'да' || value === 'нет') {
            return null
        }
        return {invalidCompleted: true};
    };
}

@Component ({
    selector: 'app-create-todo-form',
    styleUrl: './create-todo-form.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './create-todo-form.html',
    imports: [ReactiveFormsModule, NgIf]
})
export class CreateTodoFormComponent {
    @Output ()
    createTodo = new EventEmitter();

    private readonly fb = inject(FormBuilder)
    public readonly formTodo = this.fb.group({
        title: ['',[Validators.required,Validators.minLength(4)]],
        userId: ['',[Validators.required,Validators.pattern(/^\d+$/)]],
        completed: ['',[Validators.required, completedValidator()]],
    });

    private getCompletedValue():boolean {
        const value = this.formTodo.get('completed')?.value!.trim().toLowerCase();
        if (value === 'да')
            return true;
        else return false;
    }

    public submitForm (): void {
        this.createTodo.emit({...this.formTodo.value, completed: this.getCompletedValue() });
        this.formTodo.reset();
    }
 
}