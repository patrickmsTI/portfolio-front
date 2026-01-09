import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PhotosService, Photo } from '../../services/photos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private photosService = inject(PhotosService);

  readonly photos$ = combineLatest([
    this.photosService.getList(),
    this.photosService.getFeatured()
  ]).pipe(
    map(([photoList, featuredIds]) => {
      const featuredSet = new Set(featuredIds.map(id => String(id)));
      return photoList.filter(x => featuredSet.has(String(x.id)));
    })
  );

  selected: string | null = null;

  open(url: string) {
    this.selected = url;
  }

  close() {
    this.selected = null;
  }
}
