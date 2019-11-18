import { Component, OnInit } from '@angular/core';

@Component({})
export class AudioComponent implements OnInit {

  public audioCtx: any;

  public panMaster: any;
  public gainMaster: any;

  public defMasterVolume = 0.1;
  public defMasterPan = 0;
  public defMasterPoly = true;

  public defVcoWave = 1;
  public defVcoGain = 1;
  public defVcoPan = 0;
  public defVcoTune = -5;
  public defVcoEnvAttack = 0;
  public defVcoEnvDecay = 0;
  public defVcoEnvSustain = 1;
  public defVcoEnvRelease = 0.4;

  constructor() {
    this.audioCtx = new AudioContext();
  }

  ngOnInit(): void {
    const t = this.audioCtx.currentTime;
    this.panMaster = this.audioCtx.createStereoPanner();
    this.panMaster.connect(this.audioCtx.destination);
    this.panMaster.pan.value = this.defMasterPan;

    this.gainMaster = this.audioCtx.createGain();
    this.gainMaster.connect(this.panMaster);
    this.gainMaster.gain.setValueAtTime(this.defMasterVolume, t);
  }

  createVco(hz: number) {
    return new VCO(this, hz);
  }
}

class VCO {

  private waveforms = ['sine', 'sawtooth', 'square', 'triangle'];

  private pan: any;
  private vco: any;
  private vca: any;

  constructor(protected context: AudioComponent, protected hz: number) { }

  public start(): void {
    const t = this.context.audioCtx.currentTime;
    this.pan = this.createOscPan(this.context.defVcoPan);
    this.pan.connect(this.context.gainMaster);
    this.vca = this.createOscGain(t);
    this.vca.connect(this.pan);
    this.vco = this.createOscillator(t);
    this.vco.connect(this.vca);
    this.vco.start();
  }

  public stop(): void {
    const t = this.context.audioCtx.currentTime;
    this.createOscRelease(t);
    this.vco.stop(t + this.context.defVcoEnvRelease * 7);
  }

  public setWaveform(wf: number): void {
    this.vco.type = this.waveforms[wf];
  }

  public setGain(g: number): void {
    const t = this.context.audioCtx.currentTime;
    this.vca.gain.setValueAtTime(g, t);
  }

  public setPan(p: number): void {
    this.pan.pan.value = p;
  }

  public setTune(tune: number): void {
    const t = this.context.audioCtx.currentTime;
    this.vco.detune.setValueAtTime(tune, t);
  }

  private createOscPan(val: number): any {
    const oscPan = this.context.audioCtx.createStereoPanner();
    oscPan.pan.value = val;
    return oscPan;
  }

  private createOscGain(t: number): any {
    const oscGain = this.context.audioCtx.createGain();
    oscGain.gain.setValueAtTime(0, t);
    oscGain.gain.linearRampToValueAtTime(this.context.defVcoGain, t + this.context.defVcoEnvAttack);
    const max = this.context.defVcoEnvSustain > this.context.defVcoGain ? this.context.defVcoGain : this.context.defVcoEnvSustain;
    oscGain.gain.setTargetAtTime(max, t + this.context.defVcoEnvAttack, this.context.defVcoEnvDecay);
    return oscGain;
  }

  private createOscillator(t: number) {
    const osc = this.context.audioCtx.createOscillator();
    osc.type = this.waveforms[this.context.defVcoWave];
    osc.detune.setValueAtTime(this.context.defVcoTune, t);
    osc.frequency.setValueAtTime(this.hz, t);
    return osc;
  }

  private createOscRelease(t: number): void {
    const oscGain = this.vca.gain.value; // important: store gain before cancelScheduledValues
    this.vca.gain.cancelScheduledValues(t);
    this.vca.gain.setValueAtTime(oscGain, t);
    this.vca.gain.setTargetAtTime(0, t, this.context.defVcoEnvRelease);
  }
}
