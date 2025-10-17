import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor extends HttpErrorResponse {

  constructor(private toastrService: ToastrService, private router: Router) { super(toastrService) }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          let errorType = 'Error';
          // Client Side Error
          if (error.error instanceof ErrorEvent) {
            errMsg = `Error: ${error.error.message}`;
          } else {  // Server Side Error
            if (error.status === 0) {
              errMsg = `"No hay conexión con el servidor"`;
              errorType = 'Major Error';
              this.toastrService.error(errMsg, errorType, { closeButton: true });
              
            } else if(error.status === 401){
              this.toastrService.error('La sesión ha expirado', errorType, { closeButton: true });
              localStorage.clear();
              this.router.navigate(['auth/login']);
            }
            
          }

          return throwError(errMsg);
        })
      )
  }
}
