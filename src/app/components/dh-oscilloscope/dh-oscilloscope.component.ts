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

  private canvas: any;
  public height = 120;
  public width = 528;

  constructor() { }

  ngAfterViewInit() {
    this.analyser.fftSize = 2048;
    this.canvas = this.myCanvas.nativeElement.getContext('2d');
    this.canvas.clearRect(0, 0, this.width, this.height);
    this.draw();
  }

  draw() {
    const d = requestAnimationFrame(this.draw.bind(this));
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteTimeDomainData(dataArray);
    this.canvas.fillStyle = 'rgb(0, 0, 0)';
    this.canvas.fillRect(0, 0, this.width, this.height);
    this.canvas.lineWidth = 1;
    this.canvas.strokeStyle = 'lightblue';
    this.canvas.beginPath();

    const sliceWidth = this.width * 1.0 / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {

      const v = dataArray[i] / 128.0;
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

}
