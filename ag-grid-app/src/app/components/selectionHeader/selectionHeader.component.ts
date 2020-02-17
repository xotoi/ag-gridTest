import { Component } from '@angular/core';
import { IHeaderAngularComp } from 'ag-grid-angular';
import { IHeaderParams } from 'ag-grid-community';

@Component({
  template: `<input class="" type="checkbox" [checked]="isChecked" (change)="onSelectAllClick()">`
})

export class SelectionHeaderComponent implements IHeaderAngularComp {
  private params: any;
  isChecked: boolean;

  agInit(headerParams: IHeaderParams): void {
    this.params = headerParams;
    const api = this.params.api;
    this.isChecked = api.getSelectedRows().length === api.getDisplayedRowCount();

    api.addEventListener('rowSelected', () => {
      this.isChecked = api.getSelectedRows().length === api.getDisplayedRowCount();
    });
  }

  onSelectAllClick = () => {
    if (!this.isChecked) {
      this.params.api.selectAll();
      this.isChecked = true;
    } else {
      this.params.api.deselectAll();
      this.isChecked = false;
    }
  }
}
