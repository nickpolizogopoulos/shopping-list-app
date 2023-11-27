import { Component } from '@angular/core';

interface ShoppingProps {
  name: string;
  quantity: string;
  price: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemName = '';
  itemQuantity = '';
  itemPrice = '';
  shoppingList:ShoppingProps[] = []

  missingName = false;
  missingQuantity = false;
  missingPrice = false;
  missingValue = false;

  //you need cocaine to write this thing,.
  onSubmit() {
    if (this.itemName === '' ||
    this.itemPrice === '' ||
    this.itemQuantity === '') {
      if (this.itemName === '') {
        this.missingName = true;
        this.missingValue = true;
      } else this.missingName = false;
      if (this.itemQuantity === '') {
        this.missingQuantity = true;
        this.missingValue = true;
      } else this.missingQuantity = false;
      if (this.itemPrice === '') {
        this.missingPrice = true;
        this.missingValue = true;
      } else this.missingPrice = false;
      return      
    }
    this.missingName = false;
    this.missingQuantity = false;
    this.missingPrice = false;
    this.shoppingList.push({
      name: this.itemName,
      quantity: this.itemQuantity,
      price: this.itemPrice
    })
    this.missingValue = false;
    this.itemName = '';
    this.itemPrice = '';
    this.itemQuantity = '';
  }

  onClear():void {
    this.shoppingList.length = 0;
  }
  // onDelete(id:number) {
  //   this.shoppingList = [...this.shoppingList].map((item) => item.id !== id ? this.shoppingList : '' )
  // }

  onDelete(index: number): void {
    this.shoppingList.splice(index, 1);
  }

  closeAlert() {
    this.missingValue = false;
  }

  headingText():string {
    return this.shoppingList.length === 1 
      ? 'has 1 item.' 
      : this.shoppingList.length > 1 
      ? `has ${this.shoppingList.length} items.` 
      : 'is empty.'
  }

  alertText():string {
    const all:string = 'All three fields must be filled.';
    const two:string = 'Please fill the two missing fields.';
    const one:string = 'Please fill the missing field.';
    let count:number = 0;
    if (this.missingName) count ++;
    if (this.missingPrice) count ++;
    if (this.missingQuantity) count ++;
    return count === 3 ? all : count === 2 ? two : one
  }

  totalPrice( item:ShoppingProps ):number {
    return +item.price
  }
  
}
