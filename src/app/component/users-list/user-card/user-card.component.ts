import { ChangeDetectionStrategy, Component, EventEmitter, Input,Output } from "@angular/core";
import { User } from "../users-list.component";


@Component({
    selector: 'app-user-card',
    templateUrl: './user-card.component.html',
    styleUrl: './user-card.component.scss',
    standalone: true,
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class UserCardComponent {
    @Input() user!: User;

    @Output()
    deleteUser = new EventEmitter<number>();

    onDeleteUser(userId: number){
        this.deleteUser.emit(userId);
    }
}