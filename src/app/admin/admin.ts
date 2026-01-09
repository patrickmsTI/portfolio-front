import { Component, EventEmitter, Output, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { AdminHomeComponent } from './admin-home/admin-home';
import { AdminPhotoComponent } from './admin-photo/admin-photo';
import { AdminVideoComponent } from './admin-video/admin-video';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    AdminHomeComponent,
    AdminPhotoComponent,
    AdminVideoComponent
  ],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss']
})
export class AdminComponent implements AfterViewInit {

  @Output() close = new EventEmitter<void>();
  tab: 'home' | 'photo' | 'video' = 'home';

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  setTab(t: 'home' | 'photo' | 'video') {
    this.tab = t;
  }

  closeModal() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }
}
