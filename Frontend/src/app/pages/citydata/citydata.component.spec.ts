import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitydataComponent } from './citydata.component';

describe('CitydataComponent', () => {
  let component: CitydataComponent;
  let fixture: ComponentFixture<CitydataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitydataComponent]
    });
    fixture = TestBed.createComponent(CitydataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
