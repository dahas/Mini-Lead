import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhMaster',
  templateUrl: './dh-master.component.html',
  styleUrls: ['./dh-master.component.scss']
})
// tslint:disable-next-line:class-name
export class dhMasterComponent {

  @Input() volume: number;
  @Input() panning: number;
  @Input() poly: boolean;

  @Output() volumeChange = new EventEmitter<number>();
  @Output() panningChange = new EventEmitter<number>();
  @Output() modeChange = new EventEmitter<boolean>();

  marks: any = {
    colorRemaining: '#555',
    colorProgress: 'orange',
    offset: '80%',
    thickness: 2,
    size: '4%',
    majorSize: '16%',
    majorInterval: 100,
    minorInterval: 2
  };
  labels: any = {
    offset: '94%',
    step: 10,
    visible: false,
    formatFunction: (label: number): string | number => {
      // tslint:disable-next-line:triple-equals
      if (label == 0) {
        return 'Min';
      }
      // tslint:disable-next-line:triple-equals
      if (label == 100) {
        return 'Max';
      }
      return label;
    }
  };
  pointer: any = {
    type: 'arrow', thickness: 5,
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

  changeVolume(event) {
    this.volumeChange.emit(event.args.value);
  }

  changePanning(event) {
    this.panningChange.emit(event.args.value);
  }

  changeMode(event) {
    this.modeChange.emit(event.args.checked);
  }
}
