import { Component, OnInit } from '@angular/core';

@Component({})
export class AudioComponent implements OnInit {

  public audioCtx: any;

  public preset: any;

  public panMaster: any;
  public gainMaster: any;
  public analyser: any;

  public defMasterVolume: number;
  public defMasterPan: number;

  public defVcoOsc: number;
  public defVcoGain = 1;
  public defVcoEnvAttack: number;
  public defVcoEnvDecay: number;
  public defVcoEnvSustain: number;
  public defVcoEnvRelease: number;

  public defVcfFilter: number;
  public defVcfCutoff: number;
  public defVcfResonance: number;
  public defVcfEnvAttack: number;
  public defVcfEnvDecay: number;
  public defVcfEnvSustain: number;
  public defVcfEnvRelease: number;

  public defLfoOsc: number;
  public defLfoSource: number;
  public defLfoDepth: number;
  public defLfoRate: number;

  constructor() {
    this.preset = JSON.parse(localStorage.getItem('preset')) || {};
    this.audioCtx = new AudioContext();

    this.defMasterVolume = typeof this.preset.volume === 'undefined' ? 0.5 : this.preset.volume;
    this.defMasterPan = typeof this.preset.panning === 'undefined' ? 0 : this.preset.panning;

    this.defVcoOsc = typeof this.preset.vcoOsc === 'undefined' ? 1 : this.preset.vcoOsc;
    this.defVcoEnvAttack = typeof this.preset.vcoAttack === 'undefined' ? 0 : this.preset.vcoAttack;
    this.defVcoEnvDecay = typeof this.preset.vcoDecay === 'undefined' ? 0 : this.preset.vcoDecay;
    this.defVcoEnvSustain = typeof this.preset.vcoSustain === 'undefined' ? 1 : this.preset.vcoSustain;
    this.defVcoEnvRelease = typeof this.preset.vcoRelease === 'undefined' ? 0.4 : this.preset.vcoRelease;

    this.defVcfFilter = typeof this.preset.vcfFilter === 'undefined' ? 0 : this.preset.vcfFilter;
    this.defVcfCutoff = typeof this.preset.vcfCutoff === 'undefined' ? 3000 : this.preset.vcfCutoff;
    this.defVcfResonance = typeof this.preset.vcfResonance === 'undefined' ? 15 : this.preset.vcfResonance;
    this.defVcfEnvAttack = typeof this.preset.vcfAttack === 'undefined' ? 0 : this.preset.vcfAttack;
    this.defVcfEnvDecay = typeof this.preset.vcfDecay === 'undefined' ? 0 : this.preset.vcfDecay;
    this.defVcfEnvSustain = typeof this.preset.vcfSustain === 'undefined' ? 1 : this.preset.vcfSustain;
    this.defVcfEnvRelease = typeof this.preset.vcfRelease === 'undefined' ? 0.8 : this.preset.vcfRelease;

    this.defLfoOsc = typeof this.preset.lfoOsc === 'undefined' ? 0 : this.preset.lfoOsc;
    this.defLfoSource = typeof this.preset.lfoSrc === 'undefined' ? 0 : this.preset.lfoSrc;
    this.defLfoDepth = typeof this.preset.lfoDepth === 'undefined' ? 0.1 : this.preset.lfoDepth;
    this.defLfoRate = typeof this.preset.lfoRate === 'undefined' ? 4 : this.preset.lfoRate;
  }

  ngOnInit(): void {
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.connect(this.audioCtx.destination);

    const t = this.audioCtx.currentTime;
    this.panMaster = this.audioCtx.createStereoPanner();
    this.panMaster.pan.value = this.defMasterPan;
    this.panMaster.connect(this.analyser);

    this.gainMaster = this.audioCtx.createGain();
    this.gainMaster.gain.setValueAtTime(this.defMasterVolume, t);
    this.gainMaster.connect(this.panMaster);
  }

  createVco(hz: number) {
    return new VCO(this, hz);
  }

  storeSetting(key: string, value: any) {
    this.preset[key] = value;
    localStorage.setItem('preset', JSON.stringify(this.preset));
  }
}

class VCO {

  private waveforms = ['sine', 'sawtooth', 'square', 'triangle'];
  private filters = ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'peaking', 'notch', 'allpass'];

  private vcf: any;
  private lfo: any;
  private lfoGain: any;
  private vco: any;
  private vcoGain: any;
  private envVca: any;

  constructor(protected context: AudioComponent, protected hz: number) { }


  public start(): void {
    const t = this.context.audioCtx.currentTime;
    this.vcoGain = this.createVcoGain(t);
    this.vcoGain.connect(this.context.gainMaster);
    this.vcf = this.createFilter(t);
    this.vcf.connect(this.vcoGain);
    this.envVca = this.createEnvVca(t);
    this.envVca.connect(this.vcf);
    this.vco = this.createOscillator(t);
    this.vco.connect(this.envVca);

    this.lfoGain = this.createLfoGain(t);
    switch (this.context.defLfoSource) {
      case 0:
        this.lfoGain.connect(this.vcoGain.gain);
        break;
      case 1:
        this.lfoGain.connect(this.vco.detune);
        break;
      case 2:
        this.lfoGain.connect(this.vcf.frequency);
        break;
    }
    this.lfo = this.createLfo(t);
    this.lfo.connect(this.lfoGain);

    this.lfo.start();
    this.vco.start();
  }

  public stop(): void {
    const t = this.context.audioCtx.currentTime;
    this.createOscRelease(t);
    if (this.context.defVcfEnvRelease) {
      this.createFltRelease(t);
    }
    this.vco.stop(t + this.context.defVcoEnvRelease * 7);
    this.lfo.stop(t + this.context.defVcoEnvRelease * 7);
  }

  public setWaveform(wf: number): void {
    this.vco.type = this.waveforms[wf];
  }

  public setFilter(f: number): void {
    this.vcf.type = this.filters[f];
  }

  public setCutoff(c: number): void {
    const t = this.context.audioCtx.currentTime;
    this.vcf.frequency.setValueAtTime(c, t);
  }

  public setResonance(q: number): void {
    this.vcf.Q.value = q;
  }

  public setLfoOsc(wf: number): void {
    this.lfo.type = this.waveforms[wf];
  }

  public setLfoDepth(d: number): void {
    switch (this.context.defLfoSource) {
      case 0:
        this.lfoGain.gain.value = d;
        break;
      case 1:
        this.lfoGain.gain.value = d * 100;
        break;
      case 2:
        this.lfoGain.gain.value = d * 1000;
        break;
    }
  }

  public setLfoRate(r: number): void {
    this.lfo.frequency.value = r;
  }

  private createOscillator(t: number) {
    const osc = this.context.audioCtx.createOscillator();
    osc.type = this.waveforms[this.context.defVcoOsc];
    osc.frequency.setValueAtTime(this.hz, t);
    return osc;
  }

  private createLfo(t: number) {
    const oscLfo = this.context.audioCtx.createOscillator();
    oscLfo.type = this.waveforms[this.context.defLfoOsc];
    oscLfo.frequency.value = this.context.defLfoRate;
    return oscLfo;
  }

  private createLfoGain(t: number) {
    const lfoGain = this.context.audioCtx.createGain();
    switch (this.context.defLfoSource) {
      case 0:
        lfoGain.gain.value = this.context.defLfoDepth;
        break;
      case 1:
        lfoGain.gain.value = this.context.defLfoDepth * 100;
        break;
      case 2:
        lfoGain.gain.value = this.context.defLfoDepth * 1000;
        break;
    }
    return lfoGain;
  }

  private createVcoGain(t: number) {
    const vcoGain = this.context.audioCtx.createGain();
    vcoGain.gain.value = this.context.defVcoGain;
    return vcoGain;
  }

  private createEnvVca(t: number): any {
    const oscGain = this.context.audioCtx.createGain();
    oscGain.gain.setValueAtTime(0, t);
    oscGain.gain.linearRampToValueAtTime(this.context.defMasterVolume, t + this.context.defVcoEnvAttack);
    const max = this.context.defVcoEnvSustain > this.context.defMasterVolume ? this.context.defMasterVolume : this.context.defVcoEnvSustain;
    oscGain.gain.setTargetAtTime(max, t + this.context.defVcoEnvAttack, this.context.defVcoEnvDecay);
    return oscGain;
  }

  private createOscRelease(t: number): void {
    const oscGain = this.envVca.gain.value; // important: store gain before cancelScheduledValues
    this.envVca.gain.cancelScheduledValues(t);
    this.envVca.gain.setValueAtTime(oscGain, t);
    this.envVca.gain.setTargetAtTime(0, t, this.context.defVcoEnvRelease);
  }

  private createFilter(t: number): any {
    const filter = this.context.audioCtx.createBiquadFilter();
    filter.type = this.filters[this.context.defVcfFilter];
    filter.Q.value = this.context.defVcfResonance / 2;
    filter.frequency.setValueAtTime(0, t);
    filter.frequency.linearRampToValueAtTime(this.context.defVcfCutoff, t + this.context.defVcfEnvAttack);
    filter.frequency.setTargetAtTime(this.context.defVcfCutoff * this.context.defVcfEnvSustain,
      t + this.context.defVcfEnvAttack, this.context.defVcfEnvDecay);
    return filter;
  }

  private createFltRelease(t: number): void {
    const vcfFrequency = this.vcf.frequency.value; // important: store gain before cancelScheduledValues
    this.vcf.frequency.cancelScheduledValues(t);
    this.vcf.frequency.setValueAtTime(vcfFrequency, t);
    this.vcf.frequency.setTargetAtTime(0, t, this.context.defVcfEnvRelease);
  }
}
