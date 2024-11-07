import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';
import { UppercasePipe } from './uppercase.pipe';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppComponent,
    UppercasePipe
  ],
  providers: [ HttpClient],
  bootstrap: []
})
export class AppModule { }
