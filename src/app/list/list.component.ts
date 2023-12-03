import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemProps } from '../app.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
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
  @Output() deleteThisItem = new EventEmitter<Function>()
  
  onDeleteItem():void {
    this.deleteThisItem.emit(
      () => {}
      )
    }
}
