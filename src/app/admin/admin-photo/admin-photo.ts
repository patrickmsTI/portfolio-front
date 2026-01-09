import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosService, Photo } from '../../services/photos.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-admin-photo',
  standalone: true,
  imports: [CommonModule, ConfirmDialogComponent],
  templateUrl: './admin-photo.html',
  styleUrls: ['./admin-photo.scss']
})
export class AdminPhotoComponent implements OnInit {

  photos: Photo[] = [];

  showDialog = false;
  dialogLoading = false;
  photoToDelete: Photo | null = null;

  constructor(private photoService: PhotosService) {}

  ngOnInit() {
    this.loadPhotos();
  }

  loadPhotos() {
    this.photoService.getList().subscribe(list => {
      this.photos = list;
    });
  }

  upload(event: any) {
    const files: FileList = event.target.files;
    if (!files || files.length === 0) return;

    this.dialogLoading = true;

    this.photoService.upload(files).subscribe({
      next: (res) => {
        this.dialogLoading = false;
        this.loadPhotos();

        event.target.value = null;
      },
      error: () => {
        this.dialogLoading = false;
        alert("Erro ao enviar arquivo.");
      }
    });
  }

  openDeleteDialog(photo: Photo) {
    this.photoToDelete = photo;
    this.showDialog = true;
  }

  cancelDelete() {
    this.showDialog = false;
    this.photoToDelete = null;
  }

  confirmDelete() {
    if (!this.photoToDelete) return;

    this.dialogLoading = true;

    this.photoService.delete(this.photoToDelete.id).subscribe({
      next: () => {
        this.dialogLoading = false;
        this.showDialog = false;

        this.photos = this.photos.filter(p => p.id !== this.photoToDelete!.id);

        this.photoToDelete = null;
      },
      error: () => {
        this.dialogLoading = false;
        alert("Erro ao excluir imagem.");
      }
    });
  }

}
