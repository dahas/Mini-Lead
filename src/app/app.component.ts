import { Component } from '@angular/core';
import { AudioComponent } from './audio/audio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends AudioComponent {

  private vcos = {};

  public fadeOut: number;

  public ttVolume: number;
  public ttPanning: string;

  public ttVcoOsc: string;

  public ttVcfFilter: string;
  public ttVcfCutoff: string;
  public ttVcfRes: number;

  public ttLfoOsc: string;
  public ttLfoSrc: string;
  public ttLfoDepth: string;
  public ttLfoRate: number;

  constructor() {
    super();

    this.fadeOut = 0.3;

    this.ttVolume = Math.round(this.defMasterVolume * 100);
    const pan = Math.round(this.defMasterPan * 100);
    if (pan > 0) {
      this.ttPanning = 'Right ' + pan;
    } else if (pan < 0) {
      this.ttPanning = 'Left ' + pan * -1;
    } else {
      this.ttPanning = 'Centered';
    }

    switch (this.defVcoOsc) {
      case 0:
        this.ttVcoOsc = 'Sine';
        break;
      case 1:
        this.ttVcoOsc = 'Saw';
        break;
      case 2:
        this.ttVcoOsc = 'Square';
        break;
      case 3:
        this.ttVcoOsc = 'Triangle';
        break;
    }

    this.ttVcfCutoff = Math.round(this.defVcfCutoff) + ' hz';
    switch (this.defVcfFilter) {
      case 0:
        this.ttVcfFilter = 'Lowpass';
        break;
      case 1:
        this.ttVcfFilter = 'Highpass';
        break;
      case 2:
        this.ttVcfFilter = 'Bandpass';
        break;
      case 3:
        this.ttVcfFilter = 'Lowshelf';
        break;
    }
    this.ttVcfRes = Math.round(this.defVcfResonance);

    switch (this.defLfoOsc) {
      case 0:
        this.ttLfoOsc = 'Sine';
        break;
      case 1:
        this.ttLfoOsc = 'Saw';
        break;
      case 2:
        this.ttLfoOsc = 'Square';
        break;
      case 3:
        this.ttLfoOsc = 'Triangle';
        break;
    }
    switch (this.defLfoSource) {
      case 0:
        this.ttLfoSrc = 'Gain';
        break;
      case 1:
        this.ttLfoSrc = 'Tune';
        break;
      case 2:
        this.ttLfoSrc = 'Filter';
        break;
    }
    this.ttLfoDepth = Math.round(this.defLfoDepth * 100) + ' %';
    this.ttLfoRate = this.defLfoRate;
  }

  setMasterVolume(v: number): void {
    this.storeSetting('volume', v);
    this.gainMaster.gain.setValueAtTime(v, this.audioCtx.currentTime);
  }
  setMasterPan(p: number): void {
    this.storeSetting('panning', p);
    this.panMaster.pan.value = p;
  }
  setMasterPolyMode(p: boolean): void {
    this.storeSetting('poly', p);
  }

  keyOn(e: any): void {
    const vco = this.createVco(e.hz);
    vco.start();
    this.vcos[e.note] = vco;
  }
  keyOff(e: any): void {
    if (this.vcos[e.note]) {
      this.vcos[e.note].stop();
      delete this.vcos[e.note];
    }
  }

  setVcoOsc(wf: number): void {
    this.storeSetting('vcoOsc', wf);
    this.defVcoOsc = wf;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setWaveform(wf);
    });
  }
  setVcoEnvAttack(attack: number): void {
    this.storeSetting('vcoAttack', attack);
    this.defVcoEnvAttack = attack;
  }
  setVcoEnvDecay(decay: number): void {
    this.storeSetting('vcoDecay', decay);
    this.defVcoEnvDecay = decay;
  }
  setVcoEnvSustain(sustain: number): void {
    this.storeSetting('vcoSustain', sustain);
    this.defVcoEnvSustain = sustain;
  }
  setVcoEnvRelease(release: number): void {
    this.storeSetting('vcoRelease', release);
    this.defVcoEnvRelease = release;
    // this.fadeOut = release * 10;
  }

  setVcfFilter(f: number): void {
    this.storeSetting('vcfFilter', f);
    this.defVcfFilter = f;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setFilter(f);
    });
  }
  setVcfCutoff(c: number): void {
    this.storeSetting('vcfCutoff', c);
    this.defVcfCutoff = c;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setCutoff(c);
    });
  }
  setVcfRes(r: number): void {
    this.storeSetting('vcfResonance', r);
    this.defVcfResonance = r;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setResonance(r);
    });
  }
  setVcfEnvAttack(attack: number): void {
    this.storeSetting('vcfAttack', attack);
    this.defVcfEnvAttack = attack;
  }
  setVcfEnvDecay(decay: number): void {
    this.storeSetting('vcfDecay', decay);
    this.defVcfEnvDecay = decay;
  }
  setVcfEnvSustain(sustain: number): void {
    this.storeSetting('vcfSustain', sustain);
    this.defVcfEnvSustain = sustain;
  }
  setVcfEnvRelease(release: number): void {
    this.storeSetting('vcfRelease', release);
    this.defVcfEnvRelease = release;
  }
  setLfoOsc(osc: number): void {
    this.storeSetting('lfoOsc', osc);
    this.defLfoOsc = osc;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setLfoOsc(osc);
    });
  }
  setLfoSource(src: number): void {
    this.storeSetting('lfoSrc', src);
    this.defLfoSource = src;
  }
  setLfoDepth(dp: number): void {
    this.storeSetting('lfoDepth', dp);
    this.defLfoDepth = dp;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setLfoDepth(dp);
    });
  }
  setLfoRate(rt: number): void {
    this.storeSetting('lfoRate', rt);
    this.defLfoRate = rt;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setLfoRate(rt);
    });
  }
}
