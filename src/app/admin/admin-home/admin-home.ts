import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService, Photo } from '../../services/photos.service';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-home.html',
  styleUrls: ['./admin-home.scss']
})
export class AdminHomeComponent implements OnInit {

  allPhotos: Photo[] = [];
  availablePhotos: Photo[] = [];
  selectedPhotos: Photo[] = [];

  loading = false;
  saving = false;

  constructor(private photosService: PhotosService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.photosService.getList().subscribe({
      next: all => {
        this.allPhotos = all;

        this.photosService.getFeatured().subscribe({
          next: featuredIds => {
            this.selectedPhotos = this.allPhotos.filter(x => featuredIds.includes(x.id));
            this.availablePhotos = this.allPhotos.filter(x => !featuredIds.includes(x.id));
            this.loading = false;
          },
          error: err => {
            console.error(err);
            this.loading = false;
          }
        });
      },
      error: err => {
        console.error(err);
        this.loading = false;
      }
    });
  }


  selectPhoto(photo: Photo) {
    this.availablePhotos = this.availablePhotos.filter(x => x.id !== photo.id);
    this.selectedPhotos.push(photo);
  }

  removePhoto(photo: Photo) {
    this.selectedPhotos = this.selectedPhotos.filter(x => x.id !== photo.id);
    this.availablePhotos.push(photo);
  }

  save() {
    const ids = this.selectedPhotos.map(p => p.id);

    this.saving = true;

    this.photosService.saveFeatured(ids).subscribe({
      next: () => {
        this.saving = false;
        alert('Fotos da home atualizadas com sucesso!');
      },
      error: err => {
        console.error(err);
        this.saving = false;
        alert('Erro ao salvar.');
      }
    });
  }
}
