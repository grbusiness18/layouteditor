import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowEditorViewComponent } from './flow-editor-view.component';

describe('FlowEditorViewComponent', () => {
  let component: FlowEditorViewComponent;
  let fixture: ComponentFixture<FlowEditorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowEditorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
