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

  @Output() keyOn = new EventEmitter<object>();
  @Output() keyOff = new EventEmitter<object>();

  private keyTouched: boolean;
  private keyFadingOut: boolean;

  emitKeyOn(value: object) {
    this.keyOn.emit(value);
  }

  emitKeyOff(value: object) {
    this.keyOff.emit(value);
  }

  @HostListener('mousedown', ['$event.target'])
  onMouseDown(key) {
    if (key.className.includes('dh-key-')) {
      this.emitKeyOn(this.keyEvent(key));
      const bgColor = key.className.includes('dh-key-white') ? '#89d0ff' : '#065a92';
      key.style.backgroundColor = bgColor;
      key.style.animation = '';
      this.keyTouched = true;
      this.keyFadingOut = false;
    }
  }

  @HostListener('mouseup', ['$event.target'])
  onMouseUp(key) {
    if (key.className.includes('dh-key-')) {
      this.emitKeyOff({
        no: key.dataset.key,
        hz: this.frequency(key.dataset.key)
      });
      this.fadeOutTouchedKey(key);
      this.keyTouched = false;
      this.keyFadingOut = true;
    }
  }

  @HostListener('mouseout', ['$event.target'])
  onMouseOut(key) {
    if (key.className.includes('dh-key-')) {
      this.emitKeyOff({
        no: key.dataset.key,
        hz: this.frequency(key.dataset.key)
      });
      if (this.keyTouched && !this.keyFadingOut) {
        this.fadeOutTouchedKey(key);
      }
    }
  }

  frequency(keyNo: number): number {
    return 440 * Math.pow(2, (keyNo - 49) / 12);
  }

  keyEvent(key: any): object {
    return {
      no: key.dataset.key,
      hz: this.frequency(key.dataset.key)
    };
  }

  fadeOutTouchedKey(key) {
    const bgColor = key.className.includes('dh-key-white') ? '#fff' : '#000';
    key.style.backgroundColor = bgColor;
    const fadeTo = key.className.includes('dh-key-white') ? 'fade2white' : 'fade2black';
    key.style.animation = `${fadeTo} ${this.fadeOut}s`;
  }
}
