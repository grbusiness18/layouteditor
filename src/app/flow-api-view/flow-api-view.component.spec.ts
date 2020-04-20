import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowApiViewComponent } from './flow-api-view.component';

describe('FlowApiViewComponent', () => {
  let component: FlowApiViewComponent;
  let fixture: ComponentFixture<FlowApiViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowApiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowApiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
