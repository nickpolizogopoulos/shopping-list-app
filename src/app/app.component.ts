import { Component } from '@angular/core';

export interface ListItemProps {
  name:string;
  description:string;
  importance:boolean;
  type: 'personal' | 'household';
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [`
    .addTwo {
      font-size: 14px;
      cursor: pointer;
      color: rgb(211, 211, 211);
    }
  `]
})
export class AppComponent {

  addTwo:boolean = true;

  itemList:ListItemProps[] = [
    {name: 'Laptop', description: 'For working remotely.', importance: true, type: 'personal'},
    {name: 'Carpet', description: 'For my living room.', importance: false, type: 'household'},
  ];

  onItemAdded( itemData:ListItemProps ):void {
    this.itemList.push({
      name: itemData.name,
      description: itemData.description,
      importance: itemData.importance,
      type: itemData.type
      })
  }
  onClearList():void {
    this.itemList.length = 0;
  }
  removeLastItem():void {
    this.itemList.pop()
  }
  onDeleteItem(itemIndex:number):void {
    this.itemList.splice(itemIndex, 1)
  }
  listCount():string {
    const length:number = this.itemList.length;
    return length === 0 
    ? 'Your list is empty! '
    : length === 1
    ? `Your list contains ${length} item `
    : `Your list contains ${length} items `
  }
  addTwoItems():void {
    this.itemList.push(
      {name: 'Blanket', description: 'For the winter.', importance: true, type: 'household'},
      {name: 'Backpack', description: 'For carrying my laptop.', importance: false, type: 'personal'},
    )
    this.addTwo = false;
  }
  
}
