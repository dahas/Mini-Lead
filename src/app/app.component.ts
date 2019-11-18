import { Component } from '@angular/core';
import { AudioComponent } from './audio/audio.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends AudioComponent {

  private vcos = {};

  constructor() {
    super();
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
  setVcoGain(gain: number): void {
    this.defVcoGain = gain;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setGain(gain);
    });
  }
  setVcoPan(pan: number): void {
    this.defVcoPan = pan;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setPan(pan);
    });
  }
  setVcoTune(tune: number): void {
    this.defVcoTune = tune;
    Object.keys(this.vcos).forEach(note => {
      this.vcos[note].setTune(tune);
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
  }
}
