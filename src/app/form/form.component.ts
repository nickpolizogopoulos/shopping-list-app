import { Component, EventEmitter, Output } from '@angular/core';
import { ListItemProps } from '../app.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  itemName:string = '';
  itemDescription:string = '';
  itemImportant:boolean = false;
  errorAlert:boolean = false;
  missingName:boolean = false;
  missingDescription:boolean = false;
  clearedText:boolean = false;
  clearButton:boolean = true;
  loadingButton:boolean = false;

  @Output() personalItemInput = new EventEmitter<ListItemProps>();
  @Output() householdItemInput = new EventEmitter<ListItemProps>();
  @Output() clearList = new EventEmitter<Function>();
  @Output() removeLast = new EventEmitter<Function>();

  onAddPersonal():void {
    if ( this.itemName === '' ||
      this.itemDescription === '' ) {
      if ( this.itemName === '' ) {
        this.missingName = true;

        setTimeout(():void => {
          this.missingName = false;
          }, 6000); //small text goes off after 6 secs.

        this.errorAlert = true;
        setTimeout(():void => {
        this.errorAlert = false;
        }, 2000);
      } else this.missingName = false;
      if ( this.itemDescription === '' ) {
        this.missingDescription = true;

        setTimeout(():void => {
          this.missingDescription = false;
          }, 6000); //small text goes off after 6 secs.

        this.errorAlert = true;
        setTimeout(():void => {
        this.errorAlert = false;
        }, 2000);
      } else this.missingDescription = false;
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
        }, 2000);
      } else this.missingName = false;
      if ( this.itemDescription === '' ) {
        this.missingDescription = true;

        setTimeout(():void => {
          this.missingDescription = false;
          }, 6000); //(optional) small text goes off after 6 secs.

        this.errorAlert = true;
        setTimeout(():void => {
        this.errorAlert = false;
        }, 2000);
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
    this.removeLast.emit(
      ():void => {}
    );
  }
  onClear():void {
    this.loadingButton = true;
    this.clearButton = false;
    setTimeout(():void => {
      this.clearedText = true;
      this.loadingButton = false;
      this.clearButton = true;
      setTimeout(():void => {
        this.clearedText = false;
      }, 1500);
      this.clearList.emit(():void => {})
    }, 1500);
  }
  
}