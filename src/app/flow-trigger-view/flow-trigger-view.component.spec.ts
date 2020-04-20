import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTriggerViewComponent } from './flow-trigger-view.component';

describe('FlowTriggerViewComponent', () => {
  let component: FlowTriggerViewComponent;
  let fixture: ComponentFixture<FlowTriggerViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowTriggerViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTriggerViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
