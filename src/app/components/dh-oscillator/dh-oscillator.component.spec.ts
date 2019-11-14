import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhOscillatorComponent } from './dh-oscillator.component';

describe('DhOscillatorComponent', () => {
  let component: DhOscillatorComponent;
  let fixture: ComponentFixture<DhOscillatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhOscillatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhOscillatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
