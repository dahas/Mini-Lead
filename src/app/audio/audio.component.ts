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

  protected valOsc2Wave = 'square';
  protected valOsc2Gain = 1;
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

}
