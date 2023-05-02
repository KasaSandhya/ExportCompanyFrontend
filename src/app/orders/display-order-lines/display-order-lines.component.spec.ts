import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayOrderLinesComponent } from './display-order-lines.component';

describe('DisplayOrderLinesComponent', () => {
  let component: DisplayOrderLinesComponent;
  let fixture: ComponentFixture<DisplayOrderLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayOrderLinesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayOrderLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
