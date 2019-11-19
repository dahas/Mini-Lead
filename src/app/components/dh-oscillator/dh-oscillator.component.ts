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

  @Input() osc = 1;
  @Input() attack = 0;
  @Input() decay = 0;
  @Input() sustain = 1;
  @Input() release = 0;

  @Output() oscChange = new EventEmitter<number>();
  @Output() attackChange = new EventEmitter<number>();
  @Output() decayChange = new EventEmitter<number>();
  @Output() sustainChange = new EventEmitter<number>();
  @Output() releaseChange = new EventEmitter<number>();

  marks: any = {
    colorRemaining: 'orange',
    colorProgress: 'orange',
    offset: '85%',
    thickness: 2,
    size: '6%',
    majorSize: '16%',
    majorInterval: 0,
    minorInterval: 1
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

  ngAfterViewInit(): void {
    this.sliderAttack.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
    this.sliderDecay.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
    this.sliderSustain.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
    this.sliderRelease.host[0].attributes.style.nodeValue = 'width: 40px; height: 120px; min-width: 0;';
    this.sliderAttack.setValue(this.attack * 100);
    this.sliderDecay.setValue(this.decay * 100);
    this.sliderSustain.setValue(this.sustain * 100);
    this.sliderRelease.setValue(this.release * 100);
  }

  changeOsc(e: any): void {
    this.oscChange.emit(e.args.value);
  }

  changeAttack(e: any): void {
    this.attackChange.emit(parseFloat(e.args.value) / 100);
  }

  changeDecay(e: any): void {
    this.decayChange.emit(parseFloat(e.args.value) / 100);
  }

  changeSustain(e: any): void {
    this.sustainChange.emit(parseFloat(e.args.value) / 100);
  }

  changeRelease(e: any): void {
    this.releaseChange.emit(parseFloat(e.args.value) / 100);
  }

}
