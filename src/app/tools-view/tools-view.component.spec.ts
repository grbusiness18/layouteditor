import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsViewComponent } from './tools-view.component';

describe('ToolsViewComponent', () => {
  let component: ToolsViewComponent;
  let fixture: ComponentFixture<ToolsViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
