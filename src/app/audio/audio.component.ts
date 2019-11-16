import { Component, OnInit } from '@angular/core';

@Component({})
export class AudioComponent implements OnInit {

  protected audioCtx: any;

  protected fadeOut: number;
  private waveforms = ['sine', 'sawtooth', 'square', 'triangle'];

  protected panMaster: any;
  protected gainMaster: any;

  protected valVolume = 0.5;
  protected valPanning = 0;
  protected valPoly = true;

  protected gainOsc1: any;
  protected panOsc1: any;
  protected osc1: any;

  protected valOsc1Wave = 1;
  protected valOsc1Gain = 1;
  protected valOsc1Pan = -1;
  protected valOsc1Tune = -5;
  protected valOsc1Attack = 0;
  protected valOsc1Decay = 0;
  protected valOsc1Sustain = 1;
  protected valOsc1Release = 0.4;

  protected gainOsc2: any;
  protected panOsc2: any;
  protected osc2: any;

  protected valOsc2Wave = 1;
  protected valOsc2Gain = 1;
  protected valOsc2Pan = 1;
  protected valOsc2Tune = 5;
  protected valOsc2Attack = 0;
  protected valOsc2Decay = 0;
  protected valOsc2Sustain = 1;
  protected valOsc2Release = 0.4;

  protected gainOsc3: any;
  protected panOsc3: any;
  protected osc3: any;

  protected valOsc3Wave = 0;
  protected valOsc3Gain = 0;
  protected valOsc3Pan = 0;
  protected valOsc3Tune = 0;
  protected valOsc3Attack = 0;
  protected valOsc3Decay = 0;
  protected valOsc3Sustain = 0;
  protected valOsc3Release = 0;

  protected gainOsc4: any;
  protected panOsc4: any;
  protected osc4: any;

  protected valOsc4Wave = 0;
  protected valOsc4Gain = 0;
  protected valOsc4Pan = 0;
  protected valOsc4Tune = 0;
  protected valOsc4Attack = 0;
  protected valOsc4Decay = 0;
  protected valOsc4Sustain = 0;
  protected valOsc4Release = 0;

  constructor() {
    this.audioCtx = new AudioContext();
  }

  ngOnInit(): void {
    const t = this.audioCtx.currentTime;
    this.panMaster = this.audioCtx.createStereoPanner();
    this.panMaster.connect(this.audioCtx.destination);
    this.panMaster.pan.value = this.valPanning;

    this.gainMaster = this.audioCtx.createGain();
    this.gainMaster.connect(this.panMaster);
    this.gainMaster.gain.setValueAtTime(this.valVolume, t);

    this.setFadeOut();
  }

  createOscPan(val: number): any {
    const oscPan = this.audioCtx.createStereoPanner();
    oscPan.pan.value = val;
    return oscPan;
  }

  createOscGain(t: number, gn: number, at: number, dc: number, su: number): any {
    const oscGain = this.audioCtx.createGain();
    oscGain.gain.setValueAtTime(0, t);
    oscGain.gain.linearRampToValueAtTime(gn, t + at);
    const max = su > gn ? gn : su;
    oscGain.gain.setTargetAtTime(max, t + at, dc);
    return oscGain;
  }

  createOscillator(t: number, wv: number, hz: number, ct: number) {
    const osc = this.audioCtx.createOscillator();
    osc.type = this.waveforms[wv];
    osc.detune.setValueAtTime(ct, t);
    osc.frequency.setValueAtTime(hz, t);
    return osc;
  }

  createOscRelease(t: number, gn: any, rl: number): void {
    const oscGain = gn.gain.value; // important: store gain before cancelScheduledValues
    gn.gain.cancelScheduledValues(t);
    gn.gain.setValueAtTime(oscGain, t);
    gn.gain.setTargetAtTime(0, t, rl);
  }

  setFadeOut() {
    const relArr = [this.valOsc1Release, this.valOsc2Release, this.valOsc3Release, this.valOsc4Release];
    const average = relArr.reduce((prev, curr) => prev + curr, 0) / relArr.length;
    this.fadeOut = average * 10;
  }
}
