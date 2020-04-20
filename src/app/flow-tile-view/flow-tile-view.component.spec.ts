import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowTileViewComponent } from './flow-tile-view.component';

describe('FlowTileViewComponent', () => {
  let component: FlowTileViewComponent;
  let fixture: ComponentFixture<FlowTileViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlowTileViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlowTileViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
