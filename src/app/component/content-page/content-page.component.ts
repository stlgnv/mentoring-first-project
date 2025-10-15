import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

const newPages:number[] = [5,4,3,2,1];

@Component({
  selector: 'app-content-page',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './content-page.component.html',
  styleUrl: './content-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPageComponent {
  isShowImg = true;

  readonly newPages:number[] = newPages;
}
