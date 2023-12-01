import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListItemProps } from '../app.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
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
