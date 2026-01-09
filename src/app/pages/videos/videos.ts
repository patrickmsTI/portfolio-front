import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { VideosService, VideoItem } from '../../services/videos.service';

@Component({
  selector: 'app-videos',
  standalone: true,
  imports: [AsyncPipe, NgFor],
  templateUrl: './videos.html',
  styleUrls: ['./videos.scss']
})
export class VideosComponent {

  private videosService = inject(VideosService);
  private sanitizer = inject(DomSanitizer);

  readonly videos$ = this.videosService.getList().pipe(
    map((list) => {
      const normalized: VideoItem[] = list.map(item => (
        typeof item === 'string' ? { id: item } : item
      ));

      return normalized.map(v => ({
        ...v,
        embedUrl: this.buildEmbedUrl(v)
      }));
    })
  );

  private buildEmbedUrl(video: VideoItem): SafeResourceUrl {
    const youtubeId = this.getYoutubeId(video);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0&modestbranding=1`
    );
  }

  private getYoutubeId(video: VideoItem) {
    if (video.url) {
      const match = video.url.match(/[?&]v=([^&]+)/);
      if (match?.[1]) return match[1];
    }

    return video.id;
  }

}
