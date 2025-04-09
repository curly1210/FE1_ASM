import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { redirectIfLoggedInGuardGuard } from './redirect-if-logged-in-guard.guard';

describe('redirectIfLoggedInGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => redirectIfLoggedInGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
