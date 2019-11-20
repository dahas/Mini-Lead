import { Component } from '@angular/core';
import { AudioComponent } from './audio/audio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AudioComponent {

  private vcos = {};

  public fadeOut: number;

  constructor() {
    super();
    this.fadeOut = this.defVcoEnvRelease * 10;
  }

  setMasterVolume(v: number): void {
    this.gainMaster.gain.setValueAtTime(v, this.audioCtx.currentTime);
  }
  setMasterPan(p: number): void {
    this.panMaster.pan.value = p;
  }
  setMasterPolyMode(p: boolean): void {
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

  setVcoWave(wf: number): void {
    this.defVcoWave = wf;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setWaveform(wf);
    });
  }
  setLfoOsc(osc: number): void {
    this.defLfoOsc = osc;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setLfoOsc(osc);
    });
  }
  setLfoSource(src: number): void {
    this.defLfoSource = src;
  }
  setLfoDepth(dp: number): void {
    this.defLfoDepth = dp;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setLfoDepth(dp);
    });
  }
  setLfoRate(rt: number): void {
    this.defLfoRate = rt;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setLfoRate(rt);
    });
  }
  setVcoEnvAttack(attack: number): void {
    this.defVcoEnvAttack = attack;
  }
  setVcoEnvDecay(decay: number): void {
    this.defVcoEnvDecay = decay;
  }
  setVcoEnvSustain(sustain: number): void {
    this.defVcoEnvSustain = sustain;
  }
  setVcoEnvRelease(release: number): void {
    this.defVcoEnvRelease = release;
    this.fadeOut = release * 10;
  }

  setVcfFilter(f: number): void {
    this.defVcfFilter = f;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setFilter(f);
    });
  }
  setVcfCutoff(c: number): void {
    this.defVcfCutoff = c;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setCutoff(c);
    });
  }
  setVcfRes(r: number): void {
    this.defVcfResonance = r;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setResonance(r);
    });
  }
  setVcfEnvAttack(attack: number): void {
    this.defVcfEnvAttack = attack;
  }
  setVcfEnvDecay(decay: number): void {
    this.defVcfEnvDecay = decay;
  }
  setVcfEnvSustain(sustain: number): void {
    this.defVcfEnvSustain = sustain;
  }
  setVcfEnvRelease(release: number): void {
    this.defVcfEnvRelease = release;
  }
}
