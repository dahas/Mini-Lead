import { Component, HostListener, Output, EventEmitter, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhKeyboard',
  templateUrl: './dh-keyboard.component.html',
  styleUrls: ['./dh-keyboard.component.scss']
})
// tslint:disable-next-line:class-name
export class dhKeyboardComponent {

  @Input() fadeOut = 0;

  @Output() touch = new EventEmitter<number>();
  @Output() release = new EventEmitter<number>();

  private keyTouched: boolean;
  private keyFadingOut: boolean;

  private keyMap = new Map();
  private touchedKeys = [];

  constructor() {
    // PC keyboard mapping:
    this.keyMap.set(65, 28);
    this.keyMap.set(87, 29);
    this.keyMap.set(83, 30);
    this.keyMap.set(69, 31);
    this.keyMap.set(68, 32);
    this.keyMap.set(70, 33);
    this.keyMap.set(84, 34);
    this.keyMap.set(71, 35);
    this.keyMap.set(90, 36);
    this.keyMap.set(72, 37);
    this.keyMap.set(85, 38);
    this.keyMap.set(74, 39);
  }

  // PC keyboard input:
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: any): void {
    const k = this.keyMap.get(e.keyCode);
    if (k && this.touchedKeys.indexOf(k) < 0) {
      this.touchedKeys.push(k);
      this.touch.emit(this.frequency(k));
      const key = document.querySelector('[data-key="' + k + '"]') as HTMLElement;
      const bgColor = key.className.includes('dh-key-white') ? '#89d0ff' : '#065a92';
      key.style.backgroundColor = bgColor;
      key.style.animation = '';
      this.keyFadingOut = false;
    }
  }
  @HostListener('window:keyup', ['$event'])
  onKeyUp(e: any): void {
    const k = this.keyMap.get(e.keyCode);
    if (k) {
      this.release.emit(this.frequency(k));
      const key = document.querySelector('[data-key="' + k + '"]') as HTMLElement;
      this.fadeOutTouchedKey(key);
      this.touchedKeys = this.touchedKeys.filter(v => v !== k);
      this.keyFadingOut = true;
    }
  }

  // PC mouse input:
  @HostListener('mousedown', ['$event.target'])
  onMouseDown(key: any): void {
    if (key.className.includes('dh-key-')) {
      this.touch.emit(this.frequency(key.dataset.key));
      const bgColor = key.className.includes('dh-key-white') ? '#89d0ff' : '#065a92';
      key.style.backgroundColor = bgColor;
      key.style.animation = '';
      this.keyTouched = true;
      this.keyFadingOut = false;
    }
  }
  @HostListener('mouseup', ['$event.target'])
  onMouseUp(key: any): void {
    if (key.className.includes('dh-key-')) {
      this.release.emit(this.frequency(key.dataset.key));
      this.fadeOutTouchedKey(key);
      this.keyTouched = false;
      this.keyFadingOut = true;
    }
  }
  @HostListener('mouseout', ['$event.target'])
  onMouseOut(key: any): void {
    if (key.className.includes('dh-key-')) {
      this.release.emit(this.frequency(key.dataset.key));
      if (this.keyTouched && !this.keyFadingOut) {
        this.fadeOutTouchedKey(key);
      }
    }
  }

  // ----------- Helper: -----------------------------------------

  fadeOutTouchedKey(key: any): void {
    const bgColor = key.className.includes('dh-key-white') ? '#fff' : '#000';
    key.style.backgroundColor = bgColor;
    const fadeTo = key.className.includes('dh-key-white') ? 'fade2white' : 'fade2black';
    key.style.animation = `${fadeTo} ${this.fadeOut}s`;
    this.keyTouched = false;
  }

  frequency(keyNo: number): number {
    return 440 * Math.pow(2, (keyNo - 49) / 12);
  }
}
