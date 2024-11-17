import {
Component,
  output,
  signal
} from '@angular/core';

import { type ListItem } from '../utilities/list-item';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: `
  
    .form-check-input {
      border: 1px solid rgb(149, 149, 149);
    }
  
  `
})
export class FormComponent {

  itemName = signal<string>('');
  itemDescription = signal<string>('');

  itemImportant = signal<boolean>(false);
  errorAlert = signal<boolean>(false);
  missingName = signal<boolean>(false);
  missingDescription = signal<boolean>(false);
  
  clearedText = signal<boolean>(false);
  clearButton = signal<boolean>(true);
  loadingButton = signal<boolean>(false);

  personalItemInput = output<ListItem>();
  householdItemInput = output<ListItem>();
  
  clearList = output<void>();
  removeLast = output<void>();

  onAddPersonal(): void {

    if ( this.itemName() === '' || this.itemDescription() === '' ) {

      if ( this.itemName() === '' ) {
        this.missingName.set(true);

        setTimeout(() =>
          this.missingName.set(false),
          6000
        ); //small text goes off after 6 secs.

        this.errorAlert.set(true);

        setTimeout(() =>
          this.errorAlert.set(false),
          2000
        ); //error alert goes off after 2 secs.

      }

      else 
        this.missingName.set(false);

      if ( this.itemDescription() === '' ) {
        this.missingDescription.set(true);

        setTimeout( () =>
          this.missingDescription.set(false),
          6000
        ); //small text goes off after 6 secs.

        this.errorAlert.set(true);

        setTimeout( () =>
          this.errorAlert.set(false),
          2000); //error alert goes off after 2 secs.
      } 
      else
        this.missingDescription.set(false);

      return;
    }
    this.missingName.set(false);
    this.missingDescription.set(false);
    
    this.personalItemInput.emit({
      name: this.itemName()!,
      description: this.itemDescription(),
      importance: this.itemImportant(),
      type: 'personal'
    });
    this.itemName.set('');
    this.itemDescription.set('');
    this.errorAlert.set(false);
    this.itemImportant.set(false);
  }

  onAddHousehold():void {
    if ( this.itemName() === '' ||
      this.itemDescription() === '' ) {
      if ( this.itemName() === '' ) {
        this.missingName.set(true);

        setTimeout(():void => {
          this.missingName.set(false);
          }, 6000); //(optional) small text goes off after 6 secs.

        this.errorAlert.set(true);
        setTimeout( () =>
          this.errorAlert.set(false),
          2000
        ); //error alert goes off after 2 secs.
      } else this.missingName.set(false);
      if ( this.itemDescription() === '' ) {
        this.missingDescription.set(true);

        setTimeout( () =>
          this.missingDescription.set(false),
          6000
        ); //(optional) small text goes off after 6 secs.

        this.errorAlert.set(true);
        setTimeout( () =>
          this.errorAlert.set(false),
          2000
        ); //error alert goes off after 2 secs.
      }
      else
        this.missingDescription.set(false);

      return;     
    }
    this.missingName.set(false);
    this.missingDescription.set(false);
    
    this.personalItemInput.emit({
      name: this.itemName(),
      description: this.itemDescription(),
      importance: this.itemImportant(),
      type: 'household'
    });
    this.itemName.set('');
    this.itemDescription.set('');
    this.errorAlert.set(false);
    this.itemImportant.set(false);
  }

  onRemoveLast():void {
    this.removeLast.emit();
  }

  onClear():void {
    this.loadingButton.set(true);
    this.clearButton.set(false);

    setTimeout(() => {
        this.clearedText.set(true);
        this.loadingButton.set(false);
        this.clearButton.set(true);

        setTimeout( () =>
          this.clearedText.set(false),
          800
        ); // cleared text goes off after .8 secs.
        this.clearList.emit();
      },
      500
    );
    
  }
  
}