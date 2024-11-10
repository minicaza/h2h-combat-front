import { Component } from '@angular/core';
import { I18nService } from '../services/i18n.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent {

  constructor (private i18nService: I18nService){}

  switchLanguage(language: string) {
    this.i18nService.switchLanguage(language);
  }

}
