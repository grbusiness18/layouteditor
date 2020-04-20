import { TestBed } from '@angular/core/testing';

import { TxnService } from './txn.service';

describe('TxnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TxnService = TestBed.get(TxnService);
    expect(service).toBeTruthy();
  });
});
