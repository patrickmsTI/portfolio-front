import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VideoItem {
  id: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class VideosService {

  private api = '/videos';

  constructor(private http: HttpClient) {}

  getList(): Observable<Array<VideoItem | string>> {
    return this.http.get<Array<VideoItem | string>>(`${this.api}/list`);
  }

  insert(payload: { id: string; url?: string }): Observable<VideoItem | string> {
    return this.http.post<VideoItem | string>(`${this.api}/insert`, payload);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
