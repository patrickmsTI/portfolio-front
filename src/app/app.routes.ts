import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhotosComponent } from './pages/photos/photos';
import { VideosComponent } from './pages/videos/videos';
import { ContactComponent } from './pages/contact/contact';

export const routes: Routes = [
  {
    path: 'admin',
    redirectTo: '/(modal:admin)'
  },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'photos', component: PhotosComponent },
  { path: 'video', component: VideosComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' },
  {
  path: 'admin',
  outlet: 'modal',
  loadComponent: () => import('./admin/admin').then(m => m.AdminComponent)
}
];