import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { I18nService } from './services/i18n.service';
import { TranslateService, TranslateModule, TranslateLoader, TranslateStore } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

// Custom loader for testing
class FakeLoader implements TranslateLoader {
  getTranslation(lang: string) {
    return of({});
  }
}

describe('AppComponent', () => {
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    translateServiceSpy = jasmine.createSpyObj('TranslateService', ['get', 'use']);

    translateServiceSpy.get.and.returnValue(of({}));
    translateServiceSpy.use.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HttpClientModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: FakeLoader }
        })
      ],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: I18nService, useValue: {} },
        { provide: TranslateService, useValue: translateServiceSpy },
        TranslateStore
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'h2h-combat-front' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('h2h-combat-front');
  });
});
