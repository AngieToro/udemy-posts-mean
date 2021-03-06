import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ErrorComponent } from './error/error.component';


//cada solicitud HHTP saliente se le adjuntara este interceptor y sera observada y si se recibe una respuesta de error el inceptor se activa
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private dialog: MatDialog){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler){

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        //console.log(error);
        //alert(error.error.message);

        let errorMessage = "An unknown error ocurred!";
        if (error.error.message){
          errorMessage = error.error.message;
        }

        this.dialog.open(ErrorComponent, { data: { message: errorMessage}}); //es como el alert
        return throwError(error);
      })
    );
  }
}
