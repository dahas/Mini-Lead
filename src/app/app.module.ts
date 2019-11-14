import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { jqxKnobModule } from 'jqwidgets-ng/jqxknob';
import { jqxSwitchButtonComponent } from 'jqwidgets-ng/jqxswitchbutton';
import { jqxSliderComponent } from 'jqwidgets-ng/jqxslider';

import { dhMasterComponent } from './components/dh-master/dh-master.component';
import { dhKeyboardComponent } from './components/dh-keyboard/dh-keyboard.component';
import { dhOscillatorComponent } from './components/dh-oscillator/dh-oscillator.component';

@NgModule({
  declarations: [
    AppComponent,
    jqxSwitchButtonComponent,
    jqxSliderComponent,
    dhMasterComponent,
    dhKeyboardComponent,
    dhOscillatorComponent
  ],
  imports: [
    BrowserModule,
    jqxKnobModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
