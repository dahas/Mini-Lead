import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhMaster',
  templateUrl: './dh-master.component.html',
  styleUrls: ['./dh-master.component.scss']
})
// tslint:disable-next-line:class-name
export class dhMasterComponent {

  @Input() ttVolume: number;
  @Input() ttPanning: string;
  @Input() volume: number;
  @Input() panning: number;
  @Input() poly: boolean;

  @Output() volumeChange = new EventEmitter<number>();
  @Output() panningChange = new EventEmitter<number>();
  @Output() modeChange = new EventEmitter<boolean>();

  public marks: any = {
    colorRemaining: '#555',
    colorProgress: 'orange',
    offset: '80%',
    thickness: 2,
    size: '4%',
    majorSize: '16%',
    majorInterval: 1,
    minorInterval: 0.02
  };
  public labels: any = {
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
  public pointer: any = {
    type: 'arrow', thickness: 5,
    style: { fill: '#ff6126' },
    size: '60%', offset: '50%'
  };
  public spinner: any = {
    style: { fill: '#17a25d', stroke: '#666' },
    innerRadius: '65%', // specifies the inner Radius of the dial
    outerRadius: '70%', // specifies the outer Radius of the dial
  };
  public dial: any = {
    style: { fill: { color: '#a7a7a7', gradientType: 'linear', gradientStops: [[0, 1], [50, 0.5], [100, 1]] }, stroke: '#117B46' },
    innerRadius: '0%', // specifies the inner Radius of the dial
    outerRadius: '50%' // specifies the outer Radius of the dial
  };

  changeVolume(e: any): void {
    this.ttVolume = Math.round(e.args.value * 100);
    this.volumeChange.emit(parseFloat(e.args.value));
  }

  changePanning(e: any): void {
    const pan = Math.round(e.args.value * 100);
    if (pan > 0) {
      this.ttPanning = 'Right ' + pan;
    } else if (pan < 0) {
      this.ttPanning = 'Left ' + pan * -1;
    } else {
      this.ttPanning = 'Centered';
    }
    this.panningChange.emit(parseFloat(e.args.value));
  }

  changeMode(e: any): void {
    this.modeChange.emit(e.args.checked);
  }
}
