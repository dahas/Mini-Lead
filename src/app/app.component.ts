import { Component, OnInit } from '@angular/core';
import { AudioService } from './services/audio.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    private audioCtx;
    private panMaster;
    private gainMaster;
    private oscillator;

    private defVolume = 0.5;
    private defPanning = 0;
    private defPoly = true;

    constructor(private audioService: AudioService) {
        this.audioCtx = this.audioService.getContext();
    }

    ngOnInit(): void {
        this.panMaster = this.audioCtx.createStereoPanner();
        this.panMaster.connect(this.audioCtx.destination);
        this.panMaster.pan.value = this.defPanning;

        this.gainMaster = this.audioCtx.createGain();
        this.gainMaster.connect(this.panMaster);
        this.gainMaster.gain.setValueAtTime(this.defVolume, this.audioCtx.currentTime);
    }

    keyOn(key: any): void {
        // console.log('keyOn', key);
        const t = this.audioCtx.currentTime;
        this.oscillator = this.audioCtx.createOscillator();
        this.oscillator.type = 'sawtooth';
        this.oscillator.frequency.setValueAtTime(key.hz, t);
        // this.oscillator.detune.setValueAtTime(parseFloat(DETUNE.value), t);
        this.oscillator.connect(this.gainMaster);
        this.oscillator.start();
    }

    keyOff(key: any): void {
        // console.log('keyOff', key);
        if (this.oscillator) {
            this.oscillator.stop();
        }
    }

    masterVolume(v: number): void {
        console.log('volume', v);
        this.gainMaster.gain.setValueAtTime(v, this.audioCtx.currentTime);
    }

    masterPan(p: number): void {
        console.log('panning', p);
        this.panMaster.pan.value = p;
    }

    masterPolyMode(p: boolean): void {
        console.log('poly', p);
        this.defPoly = p;
    }

    osc1Wave(w: boolean): void {
        console.log('wave', w);
    }

    osc1Gain(g: boolean): void {
        console.log('gain', g);
    }

    osc1Pan(p: boolean): void {
        console.log('pan', p);
    }

    osc1Tune(t: boolean): void {
        console.log('tune', t);
    }

    osc1Attack(t: boolean): void {
        console.log('att', t);
    }

    osc1Decay(t: boolean): void {
        console.log('dec', t);
    }

    osc1Sustain(t: boolean): void {
        console.log('sus', t);
    }

    osc1Release(t: boolean): void {
        console.log('rel', t);
    }
}
