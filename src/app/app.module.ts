import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxElectronModule } from 'ngx-electron';

import { AppComponent } from './app.component';

import { jqxKnobModule } from 'jqwidgets-ng/jqxknob';
import { jqxSliderComponent } from 'jqwidgets-ng/jqxslider';
import { jqxTooltipComponent } from 'jqwidgets-ng/jqxtooltip';

import { dhMasterComponent } from './components/dh-master/dh-master.component';
import { dhKeyboardComponent } from './components/dh-keyboard/dh-keyboard.component';
import { dhOscillatorComponent } from './components/dh-oscillator/dh-oscillator.component';
import { dhFilterComponent } from './components/dh-filter/dh-filter.component';
import { dhLfoComponent } from './components/dh-lfo/dh-lfo.component';
import { dhOscilloscopeComponent } from './components/dh-oscilloscope/dh-oscilloscope.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    jqxSliderComponent,
    jqxTooltipComponent,
    dhMasterComponent,
    dhKeyboardComponent,
    dhOscillatorComponent,
    dhFilterComponent,
    dhLfoComponent,
    dhOscilloscopeComponent
  ],
  imports: [
    BrowserModule,
    NgxElectronModule,
    jqxKnobModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
