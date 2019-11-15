import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  private audioCtx: object;

  constructor() {
    this.audioCtx = new AudioContext();
  }

  getContext() {
    return this.audioCtx;
  }
}
