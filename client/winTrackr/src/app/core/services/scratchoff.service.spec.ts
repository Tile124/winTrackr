import { TestBed } from '@angular/core/testing';

import { ScratchoffService } from './scratchoff.service';

describe('ScratchoffService', () => {
  let service: ScratchoffService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScratchoffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
