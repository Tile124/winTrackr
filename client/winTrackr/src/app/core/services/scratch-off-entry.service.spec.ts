import { TestBed } from '@angular/core/testing';

import { ScratchOffEntryService } from './scratch-off-entry.service';

describe('ScratchOffEntryService', () => {
  let service: ScratchOffEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScratchOffEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
