import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from 'src/constant';

export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
    const newRequest = req.clone({headers: req.headers.set('access-token', Config.AUTH_TOKEN)});

    return next.handle(newRequest);
  }
}