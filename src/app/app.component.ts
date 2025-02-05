import { NgFor, NgIf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

const getMenuItem = (name: string) => {
  return name;
}

const newPages:number[] = [5,4,3,2,1];

const menuItems:string[] = ['Каталог','Стройматериалы','Инструменты','Электрика','Интерьер и одежда'];

const upperCaseMenuItems = menuItems.map(
  (item) => {
    return item.toUpperCase();
  }
) 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,NgIf,NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title: string = 'mentoring-first-project';
  
  readonly headerItem3 = 'Каталог';

  aboutCompany = getMenuItem('О компании');

  isShowImg = true;

  readonly newPages:number[] = newPages;

  menuItems:string[] = upperCaseMenuItems;

  isUpperCase = true;

  changeMenuText() {
    this.menuItems = upperCaseMenuItems.map(
      (item : string) => this.isUpperCase ? item.toLowerCase() : item.toUpperCase()
    )
    this.isUpperCase = !this.isUpperCase
  }
}

