import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OprPropertyViewComponent } from './opr-property-view.component';

describe('OprPropertyViewComponent', () => {
  let component: OprPropertyViewComponent;
  let fixture: ComponentFixture<OprPropertyViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OprPropertyViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OprPropertyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
