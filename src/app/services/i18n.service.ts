import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(private translate: TranslateService, private http: HttpClient) {
    this.translate.setDefaultLang('en');
    this.translate.addLangs(['es']);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
