import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowEventViewComponent } from './flow-event-view.component';

describe('FlowEventViewComponent', () => {
  let component: FlowEventViewComponent;
  let fixture: ComponentFixture<FlowEventViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowEventViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowEventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
