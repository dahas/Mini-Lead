import { Component } from '@angular/core';
import { AudioComponent } from './audio/audio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AudioComponent {

  constructor() {
    super();
  }

  setMasterVolume(v: number): void {
    this.gainMaster.gain.setValueAtTime(v, this.audioCtx.currentTime);
  }

  setMasterPan(p: number): void {
    this.panMaster.pan.value = p;
  }

  setMasterPolyMode(p: boolean): void {
    this.valPoly = p;
  }

  keyOn(hz: number): void {
    const t = this.audioCtx.currentTime;

    if (!this.valPoly) {
      if (this.osc1) { this.osc1.stop(); }
      if (this.osc2) { this.osc2.stop(); }
      if (this.osc3) { this.osc3.stop(); }
      if (this.osc4) { this.osc4.stop(); }
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

    if (this.valOsc3Gain) {
      this.panOsc3 = this.createOscPan(this.valOsc3Pan);
      this.panOsc3.connect(this.gainMaster);
      this.gainOsc3 = this.createOscGain(t, this.valOsc3Gain, this.valOsc3Attack, this.valOsc3Decay, this.valOsc3Sustain);
      this.gainOsc3.connect(this.panOsc3);
      this.osc3 = this.createOscillator(t, this.valOsc3Wave, hz, this.valOsc3Tune);
      this.osc3.connect(this.gainOsc3);
      this.osc3.start();
    }

    if (this.valOsc4Gain) {
      this.panOsc4 = this.createOscPan(this.valOsc4Pan);
      this.panOsc4.connect(this.gainMaster);
      this.gainOsc4 = this.createOscGain(t, this.valOsc4Gain, this.valOsc4Attack, this.valOsc4Decay, this.valOsc4Sustain);
      this.gainOsc4.connect(this.panOsc4);
      this.osc4 = this.createOscillator(t, this.valOsc4Wave, hz, this.valOsc4Tune);
      this.osc4.connect(this.gainOsc4);
      this.osc4.start();
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
    if (this.gainOsc3) {
      this.createOscRelease(t, this.gainOsc3, this.valOsc3Release);
      this.osc3.stop(t + this.valOsc3Release * 7);
    }
    if (this.gainOsc4) {
      this.createOscRelease(t, this.gainOsc4, this.valOsc4Release);
      this.osc4.stop(t + this.valOsc4Release * 7);
    }
  }

  setOsc1Wave(waveform: number): void {
    this.valOsc1Wave = waveform;
  }
  setOsc1Gain(gain: number): void {
    this.valOsc1Gain = gain;
  }
  setOsc1Pan(pan: number): void {
    this.valOsc1Pan = pan;
  }
  setOsc1Tune(tune: number): void {
    this.valOsc1Tune = tune;
  }
  setOsc1Attack(attack: number): void {
    this.valOsc1Attack = attack;
  }
  setOsc1Decay(decay: number): void {
    this.valOsc1Decay = decay;
  }
  setOsc1Sustain(sustain: number): void {
    this.valOsc1Sustain = sustain;
  }
  setOsc1Release(release: number): void {
    this.valOsc1Release = release;
  }

  setOsc2Wave(waveform: number): void {
    this.valOsc2Wave = waveform;
  }
  setOsc2Gain(gain: number): void {
    this.valOsc2Gain = gain;
  }
  setOsc2Pan(pan: number): void {
    this.valOsc2Pan = pan;
  }
  setOsc2Tune(tune: number): void {
    this.valOsc2Tune = tune;
  }
  setOsc2Attack(attack: number): void {
    this.valOsc2Attack = attack;
  }
  setOsc2Decay(decay: number): void {
    this.valOsc2Decay = decay;
  }
  setOsc2Sustain(sustain: number): void {
    this.valOsc2Sustain = sustain;
  }
  setOsc2Release(release: number): void {
    this.valOsc2Release = release;
  }

  setOsc3Wave(waveform: number): void {
    this.valOsc3Wave = waveform;
  }
  setOsc3Gain(gain: number): void {
    this.valOsc3Gain = gain;
  }
  setOsc3Pan(pan: number): void {
    this.valOsc3Pan = pan;
  }
  setOsc3Tune(tune: number): void {
    this.valOsc3Tune = tune;
  }
  setOsc3Attack(attack: number): void {
    this.valOsc3Attack = attack;
  }
  setOsc3Decay(decay: number): void {
    this.valOsc3Decay = decay;
  }
  setOsc3Sustain(sustain: number): void {
    this.valOsc3Sustain = sustain;
  }
  setOsc3Release(release: number): void {
    this.valOsc3Release = release;
  }

  setOsc4Wave(waveform: number): void {
    this.valOsc4Wave = waveform;
  }
  setOsc4Gain(gain: number): void {
    this.valOsc4Gain = gain;
  }
  setOsc4Pan(pan: number): void {
    this.valOsc4Pan = pan;
  }
  setOsc4Tune(tune: number): void {
    this.valOsc4Tune = tune;
  }
  setOsc4Attack(attack: number): void {
    this.valOsc4Attack = attack;
  }
  setOsc4Decay(decay: number): void {
    this.valOsc4Decay = decay;
  }
  setOsc4Sustain(sustain: number): void {
    this.valOsc4Sustain = sustain;
  }
  setOsc4Release(release: number): void {
    this.valOsc4Release = release;
  }
}
