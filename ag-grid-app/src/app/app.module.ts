import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SelectionHeaderComponent } from './../app/components/selectionHeader/selectionHeader.component';

@NgModule({
  declarations: [AppComponent, SelectionHeaderComponent],
  imports: [CommonModule, BrowserModule, HttpClientModule, AgGridModule.withComponents([SelectionHeaderComponent])],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
