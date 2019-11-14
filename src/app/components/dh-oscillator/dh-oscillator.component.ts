import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { jqxSliderComponent } from 'jqwidgets-ng/jqxslider';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhOscillator',
  templateUrl: './dh-oscillator.component.html',
  styleUrls: ['./dh-oscillator.component.scss']
})
// tslint:disable-next-line:class-name
export class dhOscillatorComponent implements AfterViewInit {

  @ViewChild('sliderAttack', null) sliderAttack: jqxSliderComponent;
  @ViewChild('sliderDecay', null) sliderDecay: jqxSliderComponent;
  @ViewChild('sliderSustain', null) sliderSustain: jqxSliderComponent;
  @ViewChild('sliderRelease', null) sliderRelease: jqxSliderComponent;

  @Input() waveform = 1;
  @Input() gain = 100;
  @Input() panning = 0;
  @Input() detune = 0;

  @Output() volumeChange = new EventEmitter<number>();
  @Output() panningChange = new EventEmitter<number>();
  @Output() modeChange = new EventEmitter<boolean>();

  private waveforms = ['Sin', 'Saw', 'Sqr', 'Tri'];

  marksWave: any = {
    colorRemaining: 'orange',
    colorProgress: 'orange',
    offset: '85%',
    thickness: 2,
    size: '6%',
    majorSize: '16%',
    majorInterval: 0,
    minorInterval: 1
  };
  labelsWave: any = {
    offset: '100%',
    step: 1,
    visible: false,
    formatFunction: (label: number): string => {
      return this.waveforms[label];
    }
  };

  marksGain: any = {
    colorRemaining: '#555',
    colorProgress: 'orange',
    offset: '85%',
    thickness: 2,
    size: '6%',
    majorSize: '16%',
    majorInterval: 100,
    minorInterval: 2
  };

  pointer: any = {
    type: 'arrow', thickness: 3,
    style: { fill: '#ff6126' },
    size: '60%', offset: '50%'
  };
  spinner: any = {
    style: { fill: '#17a25d', stroke: '#117B46' },
    innerRadius: '65%', // specifies the inner Radius of the dial
    outerRadius: '70%', // specifies the outer Radius of the dial
  };
  dial: any = {
    style: { fill: '#17a25d', stroke: '#117B46' },
    innerRadius: '0%', // specifies the inner Radius of the dial
    outerRadius: '50%' // specifies the outer Radius of the dial
  };

  ngAfterViewInit() {
    this.sliderAttack.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
    this.sliderDecay.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
    this.sliderSustain.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
    this.sliderRelease.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
  }

}
