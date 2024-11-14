import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopBarComponent } from './top-bar.component';
import { I18nService } from '../services/i18n.service';
import { TranslateModule } from '@ngx-translate/core';

describe('TopBarComponent', () => {
  let component: TopBarComponent;
  let fixture: ComponentFixture<TopBarComponent>;
  let i18nServiceMock: jasmine.SpyObj<I18nService>;

  beforeEach(async () => {
    i18nServiceMock = jasmine.createSpyObj<I18nService>('I18nService', ['switchLanguage']);

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), TopBarComponent],
      providers: [
        { provide: I18nService, useValue: i18nServiceMock } 
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call EN switchLanguage on I18nService when switchLanguage is called', () => {
    const language = 'en';
    component.switchLanguage(language);

    expect(i18nServiceMock.switchLanguage).toHaveBeenCalledWith(language);
  });

  it('should call ES switchLanguage on I18nService when switchLanguage is called', () => {
    const language = 'es';
    component.switchLanguage(language);

    expect(i18nServiceMock.switchLanguage).toHaveBeenCalledWith(language);
  });
});
