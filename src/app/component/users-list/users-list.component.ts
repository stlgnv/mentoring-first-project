import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject} from "@angular/core";
import { UserCardComponent } from "./user-card/user-card.component";
import { UsersApiService } from "../../users-api.service";
import { UsersService } from "../../users.service";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";


export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
        lat: string;
        lng: string;
      };
    };
    phone: string;
    website: string;
    company: {
      name: string;
      catchPhrase: string;
      bs: string;
    };
}

@Component({
    selector: 'app-users-list',
    templateUrl: './users-list.component.html',
    styleUrl: './users-list.component.scss',
    standalone:true,
    imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
    changeDetection:ChangeDetectionStrategy.OnPush
})

export class UsersListComponent {
    readonly usersApiService = inject(UsersApiService);
    readonly usersService = inject(UsersService);

    constructor() {
        this.usersApiService.getUsers().subscribe(
            (response: User[]) => {
                this.usersService.setUsers(response);
            }
        ) 
    }

    deleteUser(id: number) {
        this.usersService.deleteUser(id)
    }
}
