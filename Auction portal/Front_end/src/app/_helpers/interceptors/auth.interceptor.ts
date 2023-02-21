import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, finalize } from 'rxjs/operators';
// import { AuthGuard } from '../../services/auth-guard.services';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminAuthGuardService } from '../../core/auth-guard/admin-auth-guard.service';
import { ClientAuthGuardService } from 'src/app/core/auth-guard/client-auth-guard.service';
import { CustomerServiceAuthGuardService } from 'src/app/core/auth-guard/customer-service-auth-guard.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private requests: HttpRequest<any>[] = [];

    constructor(
        // private http: HttpClient,
        private authGuard: AdminAuthGuardService,
        private authGuard1: ClientAuthGuardService,
        private authGuard2: CustomerServiceAuthGuardService,
        // private loaderService: LoaderService,
        // private spinner: NgxSpinnerService
    ) { }

    // removeRequest(req: HttpRequest<any>) {
    //     const i = this.requests.indexOf(req);
    //     if (i >= 0) {
    //         this.requests.splice(i, 1);
    //     }
    //     this.loaderService.isLoading.next(this.requests.length > 0);
    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authGuard.getToken() || this.authGuard1.getToken() || this.authGuard2.getToken()) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authGuard.getToken()}`
                }
            });
            return next.handle(cloned);
        }
        else {
            return next.handle(req)
                .pipe(
                    retry(1),
                    catchError((error: HttpErrorResponse) => {
                        let errorMessage = '';
                        if (error.error instanceof ErrorEvent) {
                            // client-side error
                            errorMessage = `Error: ${error.error.message}`;
                        } else {
                            // server-side error
                            errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
                        }
                        return throwError(errorMessage);
                    }),
                );
        }
    }
    //     this.requests.push(req);

    //     console.log("No of requests--->" + this.requests.length);

    //     this.loaderService.isLoading.next(true);
    //     return Observable.create((observer: any) => {
    //         const subscription = next.handle(req)
    //             .subscribe(
    //                 event => {
    //                     if (event instanceof HttpResponse) {
    //                         this.removeRequest(req);
    //                         observer.next(event);
    //                     }
    //                 },
    //                 err => {
    //                     alert('error' + err);
    //                     this.removeRequest(req);
    //                     observer.error(err);
    //                 },
    //                 () => {
    //                     this.removeRequest(req);
    //                     observer.complete();
    //                 });
    //         // remove request from queue when cancelled
    //         return () => {
    //             this.removeRequest(req);
    //             subscription.unsubscribe();
    //         };
    //     });









    // this.loaderService.show();
    // this.spinner.show();
    // console.log('hello');

    // setTimeout(() => {
    //     /** spinner ends after 5 seconds */
    //     this.spinner.hide();
    // }, 5000);

}