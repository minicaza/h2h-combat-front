import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: spy }
      ]
    });

    service = TestBed.inject(ApiService);
    httpClientSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should play a match', (done: DoneFn) => {
    const dummyResponse = { success: true };
    const option = 'someOption';

    httpClientSpy.post.and.returnValue(of(dummyResponse));

    service.playMatch(option).subscribe(response => {
      expect(response).toEqual(dummyResponse);
      done();
    });

    expect(httpClientSpy.post).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.post.calls.mostRecent().args[0]).toBe(`${service['apiUrl']}/play`);
  });

  it('should get games', (done: DoneFn) => {
    const dummyGames = [{ id: 1, name: 'Game 1' }, { id: 2, name: 'Game 2' }];

    httpClientSpy.get.and.returnValue(of(dummyGames));

    service.getGames().subscribe(games => {
      expect(games.length).toBe(2);
      expect(games).toEqual(dummyGames);
      done();
    });

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
    expect(httpClientSpy.get.calls.mostRecent().args[0]).toBe(`${service['apiUrl']}/history`);
  });
});
