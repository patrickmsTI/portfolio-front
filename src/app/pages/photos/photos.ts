import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Photo, PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photos',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './photos.html',
  styleUrls: ['./photos.scss']
})
export class PhotosComponent implements AfterViewInit, OnDestroy {

  private photosService = inject(PhotosService);

  photos: Photo[] = [];
  nextToken: string | null = null;
  loading = false;
  done = false;
  error: string | null = null;

  @ViewChild('sentinel') sentinel?: ElementRef<HTMLDivElement>;
  private observer?: IntersectionObserver;

  selected: string | null = null;

  ngAfterViewInit() {
    this.loadMore();

    if (this.sentinel) {
      this.observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) {
            this.loadMore();
          }
        },
        { rootMargin: '200px' }
      );
      this.observer.observe(this.sentinel.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  open(url: string) {
    this.selected = url;
  }

  close() {
    this.selected = null;
  }

  private loadMore() {
    if (this.loading || this.done) {
      return;
    }

    this.loading = true;
    this.error = null;

    this.photosService.getPage(24, this.nextToken).subscribe({
      next: (res) => {
        this.photos = this.photos.concat(res.items);
        this.nextToken = res.nextToken ?? null;
        this.done = !this.nextToken;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = 'Erro ao carregar fotos.';
      }
    });
  }
}
