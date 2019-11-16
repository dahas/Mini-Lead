import { Component, OnInit } from '@angular/core';

@Component({})
export class AudioComponent implements OnInit {

  protected audioCtx: any;

  protected panMaster: any;
  protected gainMaster: any;

  protected valVolume = 0.5;
  protected valPanning = 0;
  protected valPoly = true;

  protected gainOsc1: any;
  protected panOsc1: any;
  protected osc1: any;

  protected valOsc1Wave = 'sawtooth';
  protected valOsc1Gain = 1;
  protected valOsc1Pan = 0;
  protected valOsc1Tune = 0;
  protected valOsc1Attack = 0;
  protected valOsc1Decay = 0;
  protected valOsc1Sustain = 1;
  protected valOsc1Release = 0;

  protected gainOsc2: any;
  protected panOsc2: any;
  protected osc2: any;

  protected valOsc2Wave = 'sawtooth';
  protected valOsc2Gain = 0;
  protected valOsc2Pan = 0;
  protected valOsc2Tune = 0;
  protected valOsc2Attack = 0;
  protected valOsc2Decay = 0;
  protected valOsc2Sustain = 1;
  protected valOsc2Release = 0;

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

  createOscillator(t: number, wv: string, hz: number, ct: number) {
    const osc = this.audioCtx.createOscillator();
    osc.type = wv;
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

}
