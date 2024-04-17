import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private httpClient: HttpClient) {
  }

  hello( token: string ): Observable<string> {

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'text/plain; charset=utf-8');
    headers = headers.append('Authorization', token);

    return this.httpClient.get("http://localhost:8080/api/home",
      {headers, responseType: 'text'});
  }

}
