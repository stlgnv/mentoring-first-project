import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component ({
    selector: 'app-create-user-form',
    templateUrl: './create-user-form.html',
    styleUrl: './create-user-form.scss',
    standalone: true,
    changeDetection:ChangeDetectionStrategy.OnPush,
    imports: []
})
export class CreateUserFormComponent {

}