import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { GlobalsService } from 'src/app/services/globals/globals.service';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private localStorageService: LocalStorageService, private globalsService: GlobalsService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

    let accessToken = this.localStorageService.getAccessToken();
    if (!isNullOrUndefined(accessToken)) {
      headers = headers.append(this.globalsService.ACCESS_TOKEN_KEY, accessToken);
    }

    request = request.clone({ headers: headers });
    return next.handle(request);
  }
}
