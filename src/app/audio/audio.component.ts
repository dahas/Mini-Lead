import { Component, OnInit } from '@angular/core';

@Component({})
export class AudioComponent implements OnInit {

  public audioCtx: any;

  public panMaster: any;
  public gainMaster: any;
  public analyser: any;

  public defMasterVolume = 0.5;
  public defMasterPan = 0;
  public defMasterPoly = true;

  public defVcoWave = 1; // Sawtooth
  public defVcoGain = 1;
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

  public defLfoOsc = 0; // Sine
  public defLfoSource = 2; // 0=VCA (gain), 1=VCO (tune), 2=VCF (filter)
  public defLfoDepth = 0.5;
  public defLfoRate = 3;

  constructor() {
    this.audioCtx = new AudioContext();
  }

  ngOnInit(): void {
    this.analyser = this.audioCtx.createAnalyser();
    this.analyser.fftSize = 2048;
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

  public setLfoSource(s: number): void {

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
    osc.type = this.waveforms[this.context.defVcoWave];
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
