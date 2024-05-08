import { TestBed } from '@angular/core/testing';

import { HistorySearchService } from './history-search.service';

describe('HistorySearchService', () => {
  let service: HistorySearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorySearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
