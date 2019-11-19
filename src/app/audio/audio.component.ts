import { Component, OnInit } from '@angular/core';

@Component({})
export class AudioComponent implements OnInit {

  public audioCtx: any;

  public panMaster: any;
  public gainMaster: any;

  public defMasterVolume = 0.1;
  public defMasterPan = 0;
  public defMasterPoly = true;

  public defVcoWave = 1; // Sawtooth
  public defVcoGain = 1;
  public defVcoPan = 0;
  public defVcoTune = -5;
  public defVcoEnvAttack = 0;
  public defVcoEnvDecay = 0;
  public defVcoEnvSustain = 1;
  public defVcoEnvRelease = 0.4;

  public defVcfFilter = 0; // Lowpass
  public defVcfCutoff = 10000;
  public defVcfResonance = 0;
  public defVcfEnvAttack = 0;
  public defVcfEnvDecay = 0;
  public defVcfEnvSustain = 1;
  public defVcfEnvRelease = 0;

  constructor() {
    this.audioCtx = new AudioContext();
  }

  ngOnInit(): void {
    const t = this.audioCtx.currentTime;
    this.panMaster = this.audioCtx.createStereoPanner();
    this.panMaster.pan.value = this.defMasterPan;
    this.panMaster.connect(this.audioCtx.destination);

    this.gainMaster = this.audioCtx.createGain();
    this.gainMaster.gain.setValueAtTime(this.defMasterVolume, t);
    this.gainMaster.connect(this.panMaster);
  }

  createVco(hz: number) {
    return new VCO(this, hz);
  }
}

class VCO {

  private waveforms = ['sine', 'sawtooth', 'square', 'triangle'];
  private filters = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];

  private flt: any;
  private pan: any;
  private vco: any;
  private vca: any;

  constructor(protected context: AudioComponent, protected hz: number) { }

  public start(): void {
    const t = this.context.audioCtx.currentTime;
    this.flt = this.createFilter(t);
    this.flt.connect(this.context.gainMaster);
    this.pan = this.createOscPan();
    this.pan.connect(this.flt);
    this.vca = this.createOscGain(t);
    this.vca.connect(this.pan);
    this.vco = this.createOscillator(t);
    this.vco.connect(this.vca);
    this.vco.start();
  }

  public stop(): void {
    const t = this.context.audioCtx.currentTime;
    this.createOscRelease(t);
    if (this.context.defVcfEnvRelease) {
      this.createFltRelease(t);
    }
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

  public setFilter(f: number): void {
    this.flt.type = this.filters[f];
  }

  public setCutoff(c: number): void {
    const t = this.context.audioCtx.currentTime;
    this.flt.frequency.setValueAtTime(c, t);
  }

  public setResonance(q: number): void {
    this.flt.Q.value = q;
  }

  private createOscillator(t: number) {
    const osc = this.context.audioCtx.createOscillator();
    osc.type = this.waveforms[this.context.defVcoWave];
    osc.detune.setValueAtTime(this.context.defVcoTune, t);
    osc.frequency.setValueAtTime(this.hz, t);
    return osc;
  }

  private createOscPan(): any {
    const oscPan = this.context.audioCtx.createStereoPanner();
    oscPan.pan.value = this.context.defVcoPan;
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

  private createOscRelease(t: number): void {
    const oscGain = this.vca.gain.value; // important: store gain before cancelScheduledValues
    this.vca.gain.cancelScheduledValues(t);
    this.vca.gain.setValueAtTime(oscGain, t);
    this.vca.gain.setTargetAtTime(0, t, this.context.defVcoEnvRelease);
  }

  private createFilter(t: number): any {
    const filter = this.context.audioCtx.createBiquadFilter();
    filter.type = this.filters[this.context.defVcfFilter];
    filter.Q.value = this.context.defVcfResonance;
    filter.frequency.setValueAtTime(0, t);
    filter.frequency.linearRampToValueAtTime(this.context.defVcfCutoff, t + this.context.defVcfEnvAttack);
    filter.frequency.setTargetAtTime(this.context.defVcfCutoff * this.context.defVcfEnvSustain,
      t + this.context.defVcfEnvAttack, this.context.defVcfEnvDecay);
    return filter;
  }

  private createFltRelease(t: number): void {
    const fltFrequency = this.flt.frequency.value; // important: store gain before cancelScheduledValues
    this.flt.frequency.cancelScheduledValues(t);
    this.flt.frequency.setValueAtTime(fltFrequency, t);
    this.flt.frequency.setTargetAtTime(0, t, this.context.defVcfEnvRelease);
  }
}
