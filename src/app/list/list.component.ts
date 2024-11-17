import {
  Component,
  input,
  output
} from '@angular/core';

import { type ListItem } from '../utilities/list-item';


@Component({
  selector: 'app-list',
  template: `
  
    <div class="listbox row p-3">

      <div class="col-11 d-flex align-items-center">
          @if (listItem().type === 'household') {
            <img src="../assets/house.svg" class="me-3">
          }
          @if (listItem().type === 'personal') {
            <img src="../assets/user.svg" class="me-3">
          }
          <span class="h4">
            @if (listItem().importance) {
              <u class="text-success" >{{ listItem().name }}</u>
            }
            @else {
              {{ listItem().name }}
            }
          </span>
          <img class="ms-2 me-2" src="../../assets/dash.svg">
          <span class="lead">{{ listItem().description }}</span>
      </div>

      <div class="col-1">
          <img class="cursor-pointer" src="../../assets/trashcan.svg" (click)="onDeleteItem()">
      </div>
      
    </div>
  
  `,
  styles: `

    .h4 {
      color: rgb(37, 58, 96);
    }
    
    .listbox {
        margin-bottom: 6px;
        border-bottom: .5px solid grey;
    }

    .cursor-pointer {
      transition: all .1s linear;
      padding: 5px;
      border-radius: 5px;
      border: .5px solid transparent;

      &:hover {
        border: .5px solid #dbdbdb;
        box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.1312);
      }
    }

  `
})
export class ListComponent {

  listItem = input.required<ListItem>();

  deleteThisItem = output();
  
  onDeleteItem(): void {
    this.deleteThisItem.emit();
  }

}
