import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EmailPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private api = '/email';

  constructor(private http: HttpClient) {}

  send(payload: EmailPayload): Observable<any> {
    return this.http.post(`${this.api}/send`, payload);
  }
}
