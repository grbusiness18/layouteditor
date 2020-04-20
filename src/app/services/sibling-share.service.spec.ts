import { TestBed } from '@angular/core/testing';

import { SiblingShareService } from './sibling-share.service';

describe('SiblingShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiblingShareService = TestBed.get(SiblingShareService);
    expect(service).toBeTruthy();
  });
});
