import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd/message';

/** Pass untouched request through to the next request handler. */
@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private msg: NzMessageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
      return next.handle(req).pipe(tap(() => {},
        (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status >= 500) {
            this.msg.error(err.statusText);
          }
          return;
        }
    }));
  }
}
