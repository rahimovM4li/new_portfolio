import { Routes } from '@angular/router';
import {AboutComponent} from './about/about.component';
import {ProjectsComponent} from './projects/projects.component';
import {ContactComponent} from './contact/contact.component';
import {HomeComponent} from './home/home.component';

export const routes: Routes = [
  {
    component: HomeComponent,
    path:'home'
  },
  {
    component: AboutComponent,
    path:'about'
  },
  {
    component: ProjectsComponent,
    path:'projects'
  },
  {
    component: ContactComponent,
    path:'contact'
  },
];
