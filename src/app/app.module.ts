import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppComponent
  ],
  providers: [ HttpClient],
  bootstrap: []
})
export class AppModule { }
