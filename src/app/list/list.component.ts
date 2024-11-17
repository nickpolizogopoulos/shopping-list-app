import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { ListItemProps } from '../app.component';

@Component({
  selector: 'app-list',
  template: `
  
    <div class="listbox row">
      <div class="col-11">
          <svg *ngIf="listItem.type === 'household'" xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-house me-3 mb-1" viewBox="0 0 16 16">
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
          </svg>
          <svg *ngIf="listItem.type === 'personal'" xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-person-plus me-3 mb-1" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z"/>
              <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
          </svg>
          <span class="h4">
              <u *ngIf="listItem.importance else notimportant" class="text-success" >{{ listItem.name }}</u>
              <ng-template #notimportant>{{ listItem.name }}</ng-template>
          </span>
          <img class="ms-2 me-2" src="../../assets/dash.svg">
          <span class="lead">{{ listItem.description }}</span>
      </div>
      <div class="col-1">
          <img class="cursor-pointer" src="../../assets/trashcan.svg" (click)="onDeleteItem()">
      </div>
    </div>
  
  `,
  styles: [`

    .h4 {
      color: rgb(37, 58, 96);
    }
    .listbox {
        margin-bottom: 6px;
        padding: 14px 0px;
        border-bottom: 1px solid black;
    }

  `]
})
export class ListComponent {

  @Input() listItem!:ListItemProps;
  @Output() deleteThisItem = new EventEmitter<void>();
  
  onDeleteItem(): void {
    this.deleteThisItem.emit();
  }

}
