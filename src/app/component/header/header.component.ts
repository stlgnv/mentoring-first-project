import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

const getMenuItem = (name: string) => {
    return name;
  }
  
const itemName :string = "О компании";
  
const vuzov = getMenuItem(itemName);

const menuItems:string[] = ['Каталог','Стройматериалы','Инструменты','Электрика','Интерьер и одежда'];

const upperCaseMenuItems = menuItems.map(
    (item) => {
      return item.toUpperCase();
    }
  )

@Component ({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [NgIf,NgFor,RouterLink]
})

export class HeaderComponent {
    aboutCompany = vuzov;

    isShowCatalog = true;

    readonly headerItem3 = 'Каталог';

    menuItems:string[] = upperCaseMenuItems;

    isUpperCase = true;
  
    changeMenuText() {
      this.menuItems = upperCaseMenuItems.map(
        (item : string) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
      )
      this.isUpperCase = !this.isUpperCase;
    }
}