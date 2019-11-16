import { Component } from '@angular/core';
import { AudioComponent } from './audio/audio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AudioComponent {

  public fadeOut: number;

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

    if (!this.valPoly) {
      if (this.osc1) { this.osc1.stop(); }
      if (this.osc2) { this.osc2.stop(); }
    }

    if (this.valOsc1Gain) {
      this.panOsc1 = this.createOscPan(this.valOsc1Pan);
      this.panOsc1.connect(this.gainMaster);
      this.gainOsc1 = this.createOscGain(t, this.valOsc1Gain, this.valOsc1Attack, this.valOsc1Decay, this.valOsc1Sustain);
      this.gainOsc1.connect(this.panOsc1);
      this.osc1 = this.createOscillator(t, this.valOsc1Wave, hz, this.valOsc1Tune);
      this.osc1.connect(this.gainOsc1);
      this.osc1.start();
    }

    if (this.valOsc2Gain) {
      this.panOsc2 = this.createOscPan(this.valOsc2Pan);
      this.panOsc2.connect(this.gainMaster);
      this.gainOsc2 = this.createOscGain(t, this.valOsc2Gain, this.valOsc2Attack, this.valOsc2Decay, this.valOsc2Sustain);
      this.gainOsc2.connect(this.panOsc2);
      this.osc2 = this.createOscillator(t, this.valOsc2Wave, hz, this.valOsc2Tune);
      this.osc2.connect(this.gainOsc2);
      this.osc2.start();
    }
  }

  keyOff(): void {
    const t = this.audioCtx.currentTime;

    if (this.gainOsc1) {
      this.createOscRelease(t, this.gainOsc1, this.valOsc1Release);
      this.osc1.stop(t + this.valOsc1Release * 7);
    }

    if (this.gainOsc2) {
      this.createOscRelease(t, this.gainOsc2, this.valOsc2Release);
      this.osc2.stop(t + this.valOsc2Release * 7);
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

  osc2Wave(waveform: string): void {
    this.valOsc2Wave = waveform;
  }
  osc2Gain(gain: number): void {
    this.valOsc2Gain = gain;
  }
  osc2Pan(pan: number): void {
    this.valOsc2Pan = pan;
  }
  osc2Tune(tune: number): void {
    this.valOsc2Tune = tune;
  }
  osc2Attack(attack: number): void {
    this.valOsc2Attack = attack;
  }
  osc2Decay(decay: number): void {
    this.valOsc2Decay = decay;
  }
  osc2Sustain(sustain: number): void {
    this.valOsc2Sustain = sustain;
  }
  osc2Release(release: number): void {
    this.valOsc2Release = release;
    this.fadeOut = release * 10;
  }
}
