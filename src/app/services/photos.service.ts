import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Photo {
  id: string;
  thumbUrl: string;
  mediumUrl: string;
  fullUrl: string;
}

export interface PhotoPage {
  items: Photo[];
  nextToken?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  private api = '/photos';

  constructor(private http: HttpClient) {}

  getList(): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.api}/list`);
  }

  getPage(limit: number, cursor?: string | null): Observable<PhotoPage> {
    const params: any = { limit };
    if (cursor) {
      params.cursor = cursor;
    }

    return this.http.get<PhotoPage>(`${this.api}/list/paged`, { params });
  }

  upload(files: File[] | FileList): Observable<{ ids: string[] }> {
    const form = new FormData();
    const list = Array.from(files);
    list.forEach(file => form.append('files', file));

    return this.http.post<{ ids: string[] }>(`${this.api}/insert`, form);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }

  saveFeatured(ids: string[]) {
  return this.http.post(`${this.api}/featured`, ids);
  }

  getFeatured() {
    return this.http.get<string[]>(`${this.api}/featured`);
  }
}
