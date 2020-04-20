import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortConfigViewComponent } from './port-config-view.component';

describe('PortConfigViewComponent', () => {
  let component: PortConfigViewComponent;
  let fixture: ComponentFixture<PortConfigViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortConfigViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortConfigViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
