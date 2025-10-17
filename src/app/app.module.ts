import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './components/componentes/toolbar/toolbar.component';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatTableModule } from '@angular/material/table';
import { MY_DATE_FORMATS } from './my-date-formats';
import { MAT_DATE_FORMATS } from '@angular/material/core';

import { LOCALE_ID } from '@angular/core';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatTableModule,
    AppRoutingModule
  ],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: LOCALE_ID, useValue: 'en-Es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
