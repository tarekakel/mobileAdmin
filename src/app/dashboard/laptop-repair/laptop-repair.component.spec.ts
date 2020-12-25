import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaptopRepairComponent } from './laptop-repair.component';

describe('LaptopRepairComponent', () => {
  let component: LaptopRepairComponent;
  let fixture: ComponentFixture<LaptopRepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaptopRepairComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaptopRepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
