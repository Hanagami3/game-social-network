import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayIndexComponent } from './display-index.component';

describe('DisplayIndexComponent', () => {
  let component: DisplayIndexComponent;
  let fixture: ComponentFixture<DisplayIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplayIndexComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
