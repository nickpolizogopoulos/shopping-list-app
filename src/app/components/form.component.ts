import {
Component,
  output,
  signal
} from '@angular/core';

import { type ListItem } from '../utilities/list-item';

@Component({
  selector: 'app-form',
  styles: `
  
    .form-check-input {
      border: 1px solid rgb(149, 149, 149);
    }
  
  `,
  template: `
  
    <header>
      <h3>Form: Child component #1</h3>
      <hr>
      <p class="lead">Make your own wishlist, add either a personal or household item.</p>
    </header>
    <section>
      <div class="mb-3">
        <input [(ngModel)]="itemName" type="text" class="form-control shadow-none" placeholder="Name...">
        @if ( missingName() ) {
          <small class="text-danger">Please provide an item name.</small>
        }
      </div>
      <div class="mb-3">
        <input [(ngModel)]="itemDescription" type="text" class="form-control shadow-none" placeholder="Description...">
        @if ( missingDescription() ) {
          <small class="text-danger">Please provide an item description.</small>
        }
      </div>
      <div class="form-check mb-3">
        <input [checked]="itemImportant()" (change)="itemImportant.set(!itemImportant())" class="form-check-input" type="checkbox" id="check">
        <label class="form-check-label" for="check">This item is important.</label>
      </div>
      @if ( errorAlert() ) {
        <div class="alert alert-danger ps-3 p-2">Please fill both fields!</div>
      }
    </section>
    <button (click)="onAddPersonal()" class="btn btn-primary me-3 mb-2">Personal</button>
    <button (click)="onAddHousehold()" class="btn btn-primary me-3 mb-2">Household</button>
    <button (click)="onRemoveLast()" class="btn btn-warning me-3 mb-2">Remove last</button> 
    @if ( clearButton() && !clearedText() ) {
      <button (click)="onClear()" class="btn btn-success me-3 mb-2">Clear list</button>
    }
    @if ( loadingButton() && !clearedText() ) {
    <button class="btn btn-success mb-2" type="button" disabled>
      <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
      <span role="status">Clearing...</span>
    </button>
    }
    @if ( clearedText() ) {
      <span class="text-success lead"> <img src="../../assets/check.svg"> Done!</span>
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

  //* FORM VALIDATION => BY LIDL.

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

    if ( this.itemName() === '' || this.itemDescription() === '' ) {

      if ( this.itemName() === '' ) {
        this.missingName.set(true);

        setTimeout( () =>
          this.missingName.set(false),
          6000
        ); //(optional) small text goes off after 6 secs.

        this.errorAlert.set(true);

        setTimeout( () =>
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

    setTimeout( () => {
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