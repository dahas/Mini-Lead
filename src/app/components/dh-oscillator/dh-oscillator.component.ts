import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';
import { jqxSliderComponent } from 'jqwidgets-ng/jqxslider';
import { jqxTooltipComponent } from 'jqwidgets-ng/jqxtooltip/public_api';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhOscillator',
  templateUrl: './dh-oscillator.component.html',
  styleUrls: ['./dh-oscillator.component.scss']
})
// tslint:disable-next-line:class-name
export class dhOscillatorComponent implements AfterViewInit {

  @ViewChild('tooltipAttack', null) tooltipAttack: jqxTooltipComponent;
  @ViewChild('tooltipDecay', null) tooltipDecay: jqxTooltipComponent;
  @ViewChild('tooltipSustain', null) tooltipSustain: jqxTooltipComponent;
  @ViewChild('tooltipRelease', null) tooltipRelease: jqxTooltipComponent;

  @ViewChild('sliderAttack', null) sliderAttack: jqxSliderComponent;
  @ViewChild('sliderDecay', null) sliderDecay: jqxSliderComponent;
  @ViewChild('sliderSustain', null) sliderSustain: jqxSliderComponent;
  @ViewChild('sliderRelease', null) sliderRelease: jqxSliderComponent;

  @Input() ttVcoOsc: string;
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

  public viewInitialized = false;

  public ttVcoAttack: string;
  public ttVcoDecay: string;
  public ttVcoSustain: string;
  public ttVcoRelease: string;

  public marks: any = {
    colorRemaining: 'orange',
    colorProgress: 'orange',
    offset: '85%',
    thickness: 2,
    size: '6%',
    majorSize: '16%',
    majorInterval: 0,
    minorInterval: 1
  };
  public pointer: any = {
    type: 'arrow', thickness: 3,
    style: { fill: '#ff6126' },
    size: '60%', offset: '50%'
  };
  public spinner: any = {
    style: { fill: '#17a25d', stroke: '#666' },
    innerRadius: '65%', // specifies the inner Radius of the dial
    outerRadius: '70%', // specifies the outer Radius of the dial
  };
  public dial: any = {
    style: { fill: { color: '#a7a7a7', gradientType: 'linear', gradientStops: [[0, 1], [50, 0.5], [100, 1]] }, stroke: '#666' },
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

    this.tooltipAttack.content(Math.round(this.attack * 100) + ' ms');
    this.tooltipDecay.content(Math.round(this.decay * 100) + ' ms');
    this.tooltipSustain.content(Math.round(this.sustain * 100) + ' %');
    this.tooltipRelease.content(Math.round(this.release * 100) + ' ms');

    this.viewInitialized = true;
  }

  changeOsc(e: any): void {
    switch (e.args.value) {
      case 0:
        this.ttVcoOsc = 'Sine';
        break;
      case 1:
        this.ttVcoOsc = 'Saw';
        break;
      case 2:
        this.ttVcoOsc = 'Square';
        break;
      case 3:
        this.ttVcoOsc = 'Triangle';
        break;
    }
    this.oscChange.emit(e.args.value);
  }

  changeAttack(e: any): void {
    if (this.viewInitialized) {
      this.ttVcoAttack = e.args.value + ' ms';
    }
    this.attackChange.emit(parseFloat(e.args.value) / 100);
  }

  changeDecay(e: any): void {
    if (this.viewInitialized) {
      this.ttVcoDecay = e.args.value + ' ms';
    }
    this.decayChange.emit(parseFloat(e.args.value) / 100);
  }

  changeSustain(e: any): void {
    if (this.viewInitialized) {
      this.ttVcoSustain = e.args.value + ' %';
    }
    this.sustainChange.emit(parseFloat(e.args.value) / 100);
  }

  changeRelease(e: any): void {
    if (this.viewInitialized) {
      this.ttVcoRelease = e.args.value + ' ms';
    }
    this.releaseChange.emit(parseFloat(e.args.value) / 100);
  }

}
