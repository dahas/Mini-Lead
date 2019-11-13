import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DhMasterComponent } from './dh-master.component';

describe('DhMasterComponent', () => {
  let component: DhMasterComponent;
  let fixture: ComponentFixture<DhMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DhMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DhMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
