import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileRepairComponent } from './mobile-repair.component';

describe('MobileRepairComponent', () => {
  let component: MobileRepairComponent;
  let fixture: ComponentFixture<MobileRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
