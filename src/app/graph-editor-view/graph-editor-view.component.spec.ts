import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphEditorViewComponent } from './graph-editor-view.component';

describe('GraphEditorViewComponent', () => {
  let component: GraphEditorViewComponent;
  let fixture: ComponentFixture<GraphEditorViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphEditorViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphEditorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
