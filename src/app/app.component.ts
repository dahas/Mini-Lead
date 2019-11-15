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

    this.panOsc1 = this.audioCtx.createStereoPanner();
    this.panOsc1.connect(this.gainMaster);
    this.panOsc1.pan.value = this.valOsc1Pan;

    this.gainOsc1 = this.audioCtx.createGain();
    this.gainOsc1.connect(this.panOsc1);
    this.gainOsc1.gain.setValueAtTime(0, t);
    this.gainOsc1.gain.linearRampToValueAtTime(this.valOsc1Gain, t + this.valOsc1Attack);
    const maxSustain1Val = this.valOsc1Sustain > this.valOsc1Gain ? this.valOsc1Gain : this.valOsc1Sustain;
    this.gainOsc1.gain.setTargetAtTime(maxSustain1Val, t + this.valOsc1Attack, this.valOsc1Decay);

    this.osc1 = this.audioCtx.createOscillator();
    this.osc1.type = this.valOsc1Wave;
    this.osc1.detune.setValueAtTime(this.valOsc1Tune, t);
    this.osc1.connect(this.gainOsc1);
    this.osc1.frequency.setValueAtTime(hz, t);
    this.osc1.start();

    this.panOsc2 = this.audioCtx.createStereoPanner();
    this.panOsc2.connect(this.gainMaster);
    this.panOsc2.pan.value = this.valOsc2Pan;

    this.gainOsc2 = this.audioCtx.createGain();
    this.gainOsc2.connect(this.panOsc2);
    this.gainOsc2.gain.setValueAtTime(0, t);
    this.gainOsc2.gain.linearRampToValueAtTime(this.valOsc2Gain, t + this.valOsc2Attack);
    const maxSustain2Val = this.valOsc2Sustain > this.valOsc2Gain ? this.valOsc2Gain : this.valOsc2Sustain;
    this.gainOsc2.gain.setTargetAtTime(maxSustain2Val, t + this.valOsc2Attack, this.valOsc2Decay);

    this.osc2 = this.audioCtx.createOscillator();
    this.osc2.type = this.valOsc2Wave;
    this.osc2.detune.setValueAtTime(this.valOsc2Tune, t);
    this.osc2.connect(this.gainOsc2);
    this.osc2.frequency.setValueAtTime(hz, t);
    this.osc2.start();
  }

  keyOff(): void {
    if (this.gainOsc1) {
      const t = this.audioCtx.currentTime;
      const g1 = this.gainOsc1.gain.value; // important: store gain before cancelScheduledValues

      this.gainOsc1.gain.cancelScheduledValues(t);
      this.gainOsc1.gain.setValueAtTime(g1, t);
      this.gainOsc1.gain.setTargetAtTime(0, t, this.valOsc1Release);

      this.osc1.stop(t + this.valOsc1Release * 7);

      const g2 = this.gainOsc2.gain.value;

      this.gainOsc2.gain.cancelScheduledValues(t);
      this.gainOsc2.gain.setValueAtTime(g2, t);
      this.gainOsc2.gain.setTargetAtTime(0, t, this.valOsc2Release);

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
