import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { dhMasterComponent } from './components/dh-master/dh-master.component';
import { dhKeyboardComponent } from './components/dh-keyboard/dh-keyboard.component';

import { jqxKnobModule } from 'jqwidgets-ng/jqxknob';
import { jqxSwitchButtonComponent } from 'jqwidgets-ng/jqxswitchbutton';

@NgModule({
  declarations: [
    AppComponent,
    dhMasterComponent,
    dhKeyboardComponent,
    jqxSwitchButtonComponent
  ],
  imports: [
    BrowserModule,
    jqxKnobModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
