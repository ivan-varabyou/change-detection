import { TestBed } from '@angular/core/testing';

import { CreatingComponentsService } from './creating-components.service';

describe('CreatingComponentsService', () => {
  let service: CreatingComponentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatingComponentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
