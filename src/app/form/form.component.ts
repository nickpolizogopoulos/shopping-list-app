import {
  Component,
  EventEmitter,
  Output
} from '@angular/core';

import { ListItemProps } from '../app.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [`
  
    .form-check-input {
      border: 1px solid rgb(149, 149, 149);
    }
  
  `]
})
export class FormComponent {

  itemName: string = '';
  itemDescription: string = '';
  itemImportant: boolean = false;
  errorAlert: boolean = false;
  missingName: boolean = false;
  missingDescription: boolean = false;
  clearedText: boolean = false;
  clearButton: boolean = true;
  loadingButton: boolean = false;

  @Output() personalItemInput = new EventEmitter<ListItemProps>();
  @Output() householdItemInput = new EventEmitter<ListItemProps>();
  @Output() clearList = new EventEmitter<void>();
  @Output() removeLast = new EventEmitter<void>();

  onAddPersonal(): void {

    if ( this.itemName === '' || this.itemDescription === '' ) {

      if ( this.itemName === '' ) {
        this.missingName = true;

        setTimeout(() =>
          this.missingName = false,
          6000
        ); //small text goes off after 6 secs.

        this.errorAlert = true;

        setTimeout(() =>
          this.errorAlert = false,
          2000
        ); //error alert goes off after 2 secs.

      }

      else 
        this.missingName = false;

      if ( this.itemDescription === '' ) {
        this.missingDescription = true;

        setTimeout( () =>
          this.missingDescription = false,
          6000
        ); //small text goes off after 6 secs.

        this.errorAlert = true;

        setTimeout( () =>
          this.errorAlert = false,
          2000); //error alert goes off after 2 secs.
      } 
      else
        this.missingDescription = false;

      return;
    }
    this.missingName = false;
    this.missingDescription = false;
    
    this.personalItemInput.emit({
      name: this.itemName,
      description: this.itemDescription,
      importance: this.itemImportant,
      type: 'personal'
    });
    this.itemName = '';
    this.itemDescription = '';
    this.errorAlert = false;
    this.itemImportant = false;
  }

  onAddHousehold():void {
    if ( this.itemName === '' ||
      this.itemDescription === '' ) {
      if ( this.itemName === '' ) {
        this.missingName = true;

        setTimeout(():void => {
          this.missingName = false;
          }, 6000); //(optional) small text goes off after 6 secs.

        this.errorAlert = true;
        setTimeout(():void => {
        this.errorAlert = false;
        }, 2000); //error alert goes off after 2 secs.
      } else this.missingName = false;
      if ( this.itemDescription === '' ) {
        this.missingDescription = true;

        setTimeout(():void => {
          this.missingDescription = false;
          }, 6000); //(optional) small text goes off after 6 secs.

        this.errorAlert = true;
        setTimeout(():void => {
        this.errorAlert = false;
        }, 2000); //error alert goes off after 2 secs.
      } else this.missingDescription = false;
      return;     
    }
    this.missingName = false;
    this.missingDescription = false;
    
    this.personalItemInput.emit({
      name: this.itemName,
      description: this.itemDescription,
      importance: this.itemImportant,
      type: 'household'
    });
    this.itemName = '';
    this.itemDescription = '';
    this.errorAlert = false;
    this.itemImportant = false;
  }

  onRemoveLast():void {
    this.removeLast.emit();
  }

  onClear():void {
    this.loadingButton = true;
    this.clearButton = false;

    setTimeout(() => {
        this.clearedText = true;
        this.loadingButton = false;
        this.clearButton = true;

        setTimeout( () =>
          this.clearedText = false,
          800
        ); // cleared text goes off after .8 secs.
        this.clearList.emit();
      },
      500
    );
    
  }
  
}