import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VideosService, VideoItem } from '../../services/videos.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-video',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmDialogComponent],
  templateUrl: './admin-video.html',
  styleUrls: ['./admin-video.scss']
})
export class AdminVideoComponent implements OnInit {

  videos: VideoItem[] = [];
  newVideoId = '';

  showDialog = false;
  dialogLoading = false;
  videoToDelete: VideoItem | null = null;

  constructor(
    private videosService: VideosService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.loadVideos();
  }

  loadVideos() {
    this.videosService.getList().subscribe(list => {
      this.videos = this.normalizeList(list);
    });
  }

  add() {
    const id = this.newVideoId.trim();
    if (!id) return;

    this.dialogLoading = true;

    this.videosService.insert({ id, url: this.buildVideoUrl(id) }).subscribe({
      next: (res) => {
        this.dialogLoading = false;

        const created = res ? this.normalizeList([res])[0] : { id };
        this.videos.push(created);

        this.newVideoId = '';
      },
      error: () => {
        this.dialogLoading = false;
        alert("Erro ao cadastrar video.");
      }
    });
  }

  openDeleteDialog(video: VideoItem) {
    this.videoToDelete = video;
    this.showDialog = true;
  }

  cancelDelete() {
    this.showDialog = false;
    this.videoToDelete = null;
  }

  confirmDelete() {
    if (!this.videoToDelete) return;

    this.dialogLoading = true;

    this.videosService.delete(this.videoToDelete.id).subscribe({
      next: () => {
        this.dialogLoading = false;
        this.showDialog = false;

        this.videos = this.videos.filter(v => v.id !== this.videoToDelete!.id);
        this.videoToDelete = null;
      },
      error: () => {
        this.dialogLoading = false;
        alert("Erro ao excluir video.");
      }
    });
  }

  thumbnailUrl(video: VideoItem) {
    const youtubeId = this.getYoutubeId(video);
    return youtubeId ? `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` : '';
  }

  embedUrl(video: VideoItem): SafeResourceUrl {
    const youtubeId = this.getYoutubeId(video);
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://www.youtube.com/embed/${youtubeId}?rel=0&showinfo=0&modestbranding=1`
    );
  }

  private buildVideoUrl(id: string) {
    return `https://www.youtube.com/watch?v=${id}`;
  }

  private getYoutubeId(video: VideoItem) {
    if (video.url) {
      const match = video.url.match(/[?&]v=([^&]+)/);
      if (match?.[1]) return match[1];
    }

    return video.id;
  }

  private normalizeList(list: Array<VideoItem | string>): VideoItem[] {
    return list.map(item => (
      typeof item === 'string' ? { id: item } : item
    ));
  }

}
