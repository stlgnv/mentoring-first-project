import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartHoverDirective } from '../../directives/cart-hover.directive';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { UserService } from '../../user.service';

const getMenuItem = (name: string) => {
  return name;
};

const itemName: string = 'О компании';

const vuzov = getMenuItem(itemName);

const menuItems: string[] = [
  'Каталог',
  'Стройматериалы',
  'Инструменты',
  'Электрика',
  'Интерьер и одежда',
];

const upperCaseMenuItems = menuItems.map((item) => {
  return item.toUpperCase();
});

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [
    NgIf,
    NgFor,
    RouterLink,
    DatePipe,
    CartHoverDirective,
    AsyncPipe,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly dialog = inject(MatDialog);

  public readonly userService = inject(UserService);

  today: Date = new Date();

  aboutCompany = vuzov;

  isShowCatalog = true;

  readonly headerItem3 = 'Каталог';

  readonly home = 'Главная';

  menuItems: string[] = upperCaseMenuItems;

  isUpperCase = true;

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map((item: string) =>
      this.isUpperCase ? item.toLowerCase() : item.toUpperCase(),
    );
    this.isUpperCase = !this.isUpperCase;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '400px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result: string) => {
      console.log(result);
      if (result === 'admin') {
        this.userService.loginAsAdmin();
      } else if ((result = 'user')) {
        this.userService.loginAsUser();
      } else return undefined;
    });
  }

  logout() {
    if (confirm('вы точно хотите выйти?')) {
      console.log('Совершил logout');
      return this.userService.logout();
    } else return false;
  }
}
