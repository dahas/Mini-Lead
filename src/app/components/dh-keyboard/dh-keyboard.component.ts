import { Component, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'dhKeyboard',
  templateUrl: './dh-keyboard.component.html',
  styleUrls: ['./dh-keyboard.component.scss']
})
// tslint:disable-next-line:class-name
export class dhKeyboardComponent {

  @Output() keyOn = new EventEmitter<object>();
  @Output() keyOff = new EventEmitter<object>();

  emitKeyOn(value: object) {
    this.keyOn.emit(value);
  }

  emitKeyOff(value: object) {
    this.keyOff.emit(value);
  }

  @HostListener('mousedown', ['$event.target'])
  onMouseDown(btn) {
    if (btn.className.includes('dh-key-')) {
      this.emitKeyOn(this.keyEvent(btn));
    }
  }

  @HostListener('mouseup', ['$event.target'])
  onMouseUp(btn) {
    if (btn.className.includes('dh-key-')) {
      this.emitKeyOff({
        no: btn.dataset.key,
        hz: this.frequency(btn.dataset.key)
      });
    }
  }

  @HostListener('mouseout', ['$event.target'])
  onMouseOut(btn) {
    if (btn.className.includes('dh-key-')) {
      this.emitKeyOff({
        no: btn.dataset.key,
        hz: this.frequency(btn.dataset.key)
      });
    }
  }

  frequency(keyNo: number): number {
    return 440 * Math.pow(2, (keyNo - 49) / 12);
  }

  keyEvent(btn: any): object {
    return {
      no: btn.dataset.key,
      hz: this.frequency(btn.dataset.key)
    };
  }

}
