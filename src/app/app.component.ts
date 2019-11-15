import { Component } from '@angular/core';
import { AudioComponent } from './audio/audio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AudioComponent {

  private fadeOut: number;

  constructor() {
    super();
  }

  masterVolume(v: number): void {
    this.gainMaster.gain.setValueAtTime(v, this.audioCtx.currentTime);
  }

  masterPan(p: number): void {
    this.panMaster.pan.value = p;
  }

  masterPolyMode(p: boolean): void {
    this.valPoly = p;
  }

  keyOn(hz: number): void {
    const t = this.audioCtx.currentTime;

    if (!this.valPoly && this.osc1) {
      this.osc1.stop();
    }

    this.panOsc1 = this.audioCtx.createStereoPanner();
    this.panOsc1.connect(this.gainMaster);
    this.panOsc1.pan.value = this.valOsc1Pan;

    this.gainOsc1 = this.audioCtx.createGain();
    this.gainOsc1.connect(this.panOsc1);
    this.gainOsc1.gain.setValueAtTime(0, t);
    this.gainOsc1.gain.linearRampToValueAtTime(this.valOsc1Gain, t + this.valOsc1Attack);
    const maxSustainVal = this.valOsc1Sustain > this.valOsc1Gain ? this.valOsc1Gain : this.valOsc1Sustain;
    this.gainOsc1.gain.setTargetAtTime(maxSustainVal, t + this.valOsc1Attack, this.valOsc1Decay);

    this.osc1 = this.audioCtx.createOscillator();
    this.osc1.type = this.valOsc1Wave;
    this.osc1.detune.setValueAtTime(this.valOsc1Tune, t);
    this.osc1.connect(this.gainOsc1);
    this.osc1.frequency.setValueAtTime(hz, t);
    this.osc1.start();
  }

  keyOff(): void {
    if (this.gainOsc1) {
      const t = this.audioCtx.currentTime;
      const g = this.gainOsc1.gain.value; // important: store gain before cancelScheduledValues

      this.gainOsc1.gain.cancelScheduledValues(t);
      this.gainOsc1.gain.setValueAtTime(g, t);
      this.gainOsc1.gain.setTargetAtTime(0, t, this.valOsc1Release);

      this.osc1.stop(t + this.valOsc1Release * 7);
    }
  }

  osc1Wave(waveform: string): void {
    this.valOsc1Wave = waveform;
  }

  osc1Gain(gain: number): void {
    this.valOsc1Gain = gain;
  }

  osc1Pan(pan: number): void {
    this.valOsc1Pan = pan;
  }

  osc1Tune(tune: number): void {
    this.valOsc1Tune = tune;
  }

  osc1Attack(attack: number): void {
    this.valOsc1Attack = attack;
  }

  osc1Decay(decay: number): void {
    this.valOsc1Decay = decay;
  }

  osc1Sustain(sustain: number): void {
    this.valOsc1Sustain = sustain;
  }

  osc1Release(release: number): void {
    this.valOsc1Release = release;
    this.fadeOut = release * 10;
  }
}
