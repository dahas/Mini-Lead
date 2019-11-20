import { Component, ViewChild, AfterViewInit, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhOscilloscope',
  templateUrl: './dh-oscilloscope.component.html',
  styleUrls: ['./dh-oscilloscope.component.scss']
})
// tslint:disable-next-line:class-name
export class dhOscilloscopeComponent implements AfterViewInit {

  @ViewChild('myCanvas', { static: false }) myCanvas: any;

  @Input() analyser: any;

  private type = 'line';

  private canvas: any;
  public height = 96;
  public width = 455;
  public bufferLength: any;
  public dataArray: any;

  constructor() { }

  ngAfterViewInit() {
    this.analyser.fftSize = this.type === 'line' ? 2048 : 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);

    this.canvas = this.myCanvas.nativeElement.getContext('2d');
    this.canvas.clearRect(0, 0, this.width, this.height);

    if (this.type === 'line') {
      this.drawLine();
    } else {
      this.drawBar();
    }
  }

  drawLine() {
    requestAnimationFrame(this.drawLine.bind(this));
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.canvas.fillStyle = '#35424E';
    this.canvas.fillRect(0, 0, this.width, this.height);

    // Reset the current path
    this.canvas.lineWidth = 1;
    this.canvas.strokeStyle = '#89d0ff';
    this.canvas.beginPath();
    this.canvas.moveTo(0, 0);
    this.canvas.lineTo(0, this.height);

    for (let n = 0; n <= 24; n++) {
      const step =  n * 4;
      const major = (n / 3) % 2 === 0 ? 8 : 4;
      this.canvas.moveTo(0, step);
      this.canvas.lineTo(major, step);
    }
    this.canvas.stroke();

    this.canvas.lineWidth = 1;
    this.canvas.strokeStyle = '#89d0ff';
    this.canvas.beginPath();

    const sliceWidth = this.width * 1.0 / this.bufferLength;
    let x = 0;
    for (let i = 0; i < this.bufferLength; i++) {

      const v = this.dataArray[i] / 128.0;
      const y = v * this.height / 2;

      if (i === 0) {
        this.canvas.moveTo(x, y);
      } else {
        this.canvas.lineTo(x, y);
      }

      x += sliceWidth;
    }
    this.canvas.lineTo(this.width, this.height / 2);
    this.canvas.stroke();
  }

  drawBar() {
    requestAnimationFrame(this.drawBar.bind(this));
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.canvas.fillStyle = 'rgb(0, 0, 0)';
    this.canvas.fillRect(0, 0, this.width, this.height);
    const barWidth = (this.width / this.bufferLength) * 2.5;
    let barHeight: number;
    let x = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i] / 2;

      this.canvas.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      this.canvas.fillRect(x, this.height - barHeight / 2, barWidth, barHeight);

      x += barWidth + 1;
    }
  }

}
