import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {NumberInputComponent} from './number-input/number-input.component';
import {CommaDirective} from './comma.directive';

@NgModule({
  declarations: [
    AppComponent,
    NumberInputComponent,
    CommaDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
