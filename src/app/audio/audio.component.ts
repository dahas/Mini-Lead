import { Component, OnInit } from '@angular/core';

@Component({})
export class AudioComponent implements OnInit {

  protected audioCtx: any;

  protected fadeOut: number;

  protected panMaster: any;
  protected gainMaster: any;

  protected valVolume = 0.1;
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

  createVco(hz: number) {
    return new VCO(hz, this.audioCtx, this.gainMaster, this.valOsc1Pan, this.valOsc1Gain, this.valOsc1Wave, this.valOsc1Attack,
      this.valOsc1Decay, this.valOsc1Release, this.valOsc1Sustain, this.valOsc1Tune);
  }

  setFadeOut() {
    const relArr = [this.valOsc1Release, this.valOsc2Release, this.valOsc3Release, this.valOsc4Release];
    const average = relArr.reduce((prev, curr) => prev + curr, 0) / relArr.length;
    this.fadeOut = average * 10;
  }
}

class VCO {

  private waveforms = ['sine', 'sawtooth', 'square', 'triangle'];

  private vco: any;
  private vca: any;

  constructor(protected hz: number, protected audioCtx: any, protected gainMaster: any, protected valPan: number,
              protected valGain: number, protected valWave: number, protected valAttack: number,
              protected valDecay: number, protected valRelease: number, protected valSustain: number,
              protected valTune: number) {}

  start(): void {
    const t = this.audioCtx.currentTime;
    const pan = this.createOscPan(this.valPan);
    pan.connect(this.gainMaster);
    this.vca = this.createOscGain(t);
    this.vca.connect(pan);
    this.vco = this.createOscillator(t);
    this.vco.connect(this.vca);
    this.vco.start();
  }

  stop() {
    const t = this.audioCtx.currentTime;
    this.createOscRelease(t);
    this.vco.stop(t + this.valRelease * 7);
  }

  createOscPan(val: number): any {
    const oscPan = this.audioCtx.createStereoPanner();
    oscPan.pan.value = val;
    return oscPan;
  }

  createOscGain(t: number): any {
    const oscGain = this.audioCtx.createGain();
    oscGain.gain.setValueAtTime(0, t);
    oscGain.gain.linearRampToValueAtTime(this.valGain, t + this.valAttack);
    const max = this.valSustain > this.valGain ? this.valGain : this.valSustain;
    oscGain.gain.setTargetAtTime(max, t + this.valAttack, this.valDecay);
    return oscGain;
  }

  createOscillator(t: number) {
    const osc = this.audioCtx.createOscillator();
    osc.type = this.waveforms[this.valWave];
    osc.detune.setValueAtTime(this.valTune, t);
    osc.frequency.setValueAtTime(this.hz, t);
    return osc;
  }

  createOscRelease(t: number): void {
    const oscGain = this.vca.gain.value; // important: store gain before cancelScheduledValues
    this.vca.gain.cancelScheduledValues(t);
    this.vca.gain.setValueAtTime(oscGain, t);
    this.vca.gain.setTargetAtTime(0, t, this.valRelease);
  }
}
