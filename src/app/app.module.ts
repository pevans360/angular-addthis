import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './firstPage.component';
import { AnotherPageComponent } from './anotherPage.component';
import { AddThisComponent } from './addThis.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, AppRoutingModule ],
  declarations: [ AppComponent, AddThisComponent, FirstPageComponent, AnotherPageComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
