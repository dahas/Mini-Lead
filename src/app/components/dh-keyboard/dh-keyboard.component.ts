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

  @Output() touch = new EventEmitter<any>();
  @Output() release = new EventEmitter<any>();

  private keyTouched: boolean;
  private keyFadingOut: boolean;

  private keyMap = new Map();
  private touchedKeys = [];

  constructor() {
    // PC keyboard mapping:
    let c = 28;
    this.keyMap.set(65, [c++, 'C3']);  // A
    this.keyMap.set(87, [c++, 'C#3']); // W
    this.keyMap.set(83, [c++, 'D3']);  // S
    this.keyMap.set(69, [c++, 'D#3']); // E
    this.keyMap.set(68, [c++, 'E3']);  // D
    this.keyMap.set(70, [c++, 'F3']);  // F
    this.keyMap.set(84, [c++, 'F#3']); // T
    this.keyMap.set(71, [c++, 'G3']);  // G
    this.keyMap.set(90, [c++, 'G#3']); // Z
    this.keyMap.set(72, [c++, 'A3']);  // H
    this.keyMap.set(85, [c++, 'A#3']); // U
    this.keyMap.set(74, [c++, 'B3']);  // J
    this.keyMap.set(75, [c++, 'C4']);  // K
    this.keyMap.set(79, [c++, 'C#4']); // O
    this.keyMap.set(76, [c++, 'D4']);  // L
    this.keyMap.set(80, [c++, 'D#4']); // P
  }

  // PC keyboard input:
  @HostListener('window:keydown', ['$event'])
  onKeyDown(e: any): void {
    const k = this.keyMap.get(e.keyCode);
    if (k && this.touchedKeys.indexOf(k[0]) < 0) {
      this.touchedKeys.push(k[0]);
      this.touch.emit({
        note: k[1],
        hz: this.frequency(k[0])
      });
      const key = document.querySelector('[data-key="' + k[0] + '"]') as HTMLElement;
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
      this.release.emit({
        note: k[1],
        hz: this.frequency(k[0])
      });
      const key = document.querySelector('[data-key="' + k[0] + '"]') as HTMLElement;
      this.fadeOutTouchedKey(key);
      this.touchedKeys = this.touchedKeys.filter(v => v !== k[0]);
      this.keyFadingOut = true;
    }
  }

  // PC mouse input:
  @HostListener('mousedown', ['$event.target'])
  onMouseDown(key: any): void {
    if (key.className.includes('dh-key-')) {
      this.touch.emit({
        note: key.dataset.note,
        hz: this.frequency(key.dataset.key)
      });
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
      this.release.emit({
        note: key.dataset.note,
        hz: this.frequency(key.dataset.key)
      });
      this.fadeOutTouchedKey(key);
      this.keyTouched = false;
      this.keyFadingOut = true;
    }
  }
  @HostListener('mouseout', ['$event.target'])
  onMouseOut(key: any): void {
    if (key.className.includes('dh-key-')) {
      this.release.emit({
        note: key.dataset.note,
        hz: this.frequency(key.dataset.key)
      });
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
