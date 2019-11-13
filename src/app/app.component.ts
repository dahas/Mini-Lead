import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

    keyOn(key: object) {
        // console.log('keyOn', key);
    }

    keyOff(key: object) {
        // console.log('keyOff', key);
    }

    volume(v: number) {
        // console.log('volume', v);
    }

    panning(p: number) {
        // console.log('panning', p);
    }

    poly(p: boolean) {
        // console.log('poly', p);
    }
}
