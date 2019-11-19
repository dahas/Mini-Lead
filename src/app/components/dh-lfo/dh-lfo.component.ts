import { Component, OnInit, Output, EventEmitter, Input, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhLfo',
  templateUrl: './dh-lfo.component.html',
  styleUrls: ['./dh-lfo.component.scss']
})
// tslint:disable-next-line:class-name
export class dhLfoComponent implements AfterViewInit {

  @Input() lfoOsc = 1;
  @Input() lfoSource = 0;
  @Input() lfoDepth = 0;
  @Input() lfoRate = 0;

  @Output() lfoOscChange = new EventEmitter<number>();
  @Output() lfoSourceChange = new EventEmitter<number>();
  @Output() lfoDepthChange = new EventEmitter<number>();
  @Output() lfoRateChange = new EventEmitter<number>();

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

  marksLfoSrc: any = {
    colorRemaining: '#555',
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

  ngAfterViewInit(): void {}

  changeLfoOsc(e: any): void {
    this.lfoOscChange.emit(e.args.value);
  }

  changeLfoSource(e: any): void {
    this.lfoSourceChange.emit(parseFloat(e.args.value));
  }

  changeLfoDepth(e: any): void {
    this.lfoDepthChange.emit(e.args.value);
  }

  changeLfoRate(e: any): void {
    this.lfoRateChange.emit(e.args.value);
  }

}
