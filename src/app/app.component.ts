import { Component } from '@angular/core';
import { AudioComponent } from './audio/audio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent extends AudioComponent {

  private vcos = {};

  public fadeOut: number;

  constructor() {
    super();
    this.fadeOut = this.defVcoEnvRelease * 10;
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
    this.defMasterPoly = p;
  }

  keyOn(e: any): void {
    if (!this.defMasterPoly) {
      Object.keys(this.vcos).forEach(note => {
        this.vcos[note].stop();
        delete this.vcos[note];
      });
    }
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
    this.fadeOut = release * 10;
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
