import {
  Component,
  signal
} from '@angular/core';

import { type ListItem } from './utilities/list-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: `

    .addTwo {
      margin-left: 20px;
      font-size: 14px;
      cursor: pointer;
      color: rgb(211, 211, 211);
    }

  `
})
export class AppComponent {

  addTwo = signal<boolean>(true);

  private itemList = signal<ListItem[]>([
    {
      name: 'Laptop',
      description: 'For working remotely.', importance: true, 
      type: 'personal'
    },
    {
      name: 'Carpet',
      description: 'For my living room.', importance: false,
      type: 'household'
    }
  ]);

  allItems = this.itemList.asReadonly();

  onItemAdded( itemData: ListItem ): void {

    const item: ListItem = {
      name: itemData.name,
      description: itemData.description,
      importance: itemData.importance,
      type: itemData.type
    };

    this.itemList().push(item);
  }

  onClearList(): void {
    this.itemList().length = 0;
  }

  removeLastItem(): void {
    this.itemList().pop();
  }

  onDeleteItem(itemIndex: number): void {
    this.itemList().splice(itemIndex, 1);
  }

  listCount(): string {
    const length: number = this.itemList().length;
    return (
        length === 0 
      ? 'Your list is empty! '
      : length === 1
      ? `Your list contains ${length} item `
      : `Your list contains ${length} items `
    );
  }

  addTwoItems(): void {
    this.itemList().push(
      {
        name: 'Blanket',
        description: 'For the winter.',
        importance: true,
        type: 'household'
      },
      {
        name: 'Backpack',
        description: 'For carrying my laptop.',
        importance: false,
        type: 'personal'
      }
    );
    
    this.addTwo.set(false);
  }
  
}
