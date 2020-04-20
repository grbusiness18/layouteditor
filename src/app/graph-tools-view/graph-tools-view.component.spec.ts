import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphToolsViewComponent } from './graph-tools-view.component';

describe('GraphToolsViewComponent', () => {
  let component: GraphToolsViewComponent;
  let fixture: ComponentFixture<GraphToolsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphToolsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphToolsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
