import { TestBed } from '@angular/core/testing';
import { I18nService } from './i18n.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

describe('I18nService', () => {
  let service: I18nService;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['setDefaultLang', 'addLangs', 'use']);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    TestBed.configureTestingModule({
      providers: [
        I18nService,
        { provide: TranslateService, useValue: translateServiceSpy },
        { provide: HttpClient, useValue: httpClientSpy }
      ]
    });

    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set default language to "en" on initialization', () => {
    expect(translateServiceSpy.setDefaultLang).toHaveBeenCalledWith('en');
  });

  it('should add supported languages on initialization', () => {
    expect(translateServiceSpy.addLangs).toHaveBeenCalledWith(['es']);
  });

  it('should switch language', () => {
    const language = 'es';
    service.switchLanguage(language);
    expect(translateServiceSpy.use).toHaveBeenCalledWith(language);
  });
});
