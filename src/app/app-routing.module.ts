import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ApplProfileComponent } from './modules/registration/components/appl-profile/appl-profile.component';
import { ApplDocUploadComponent } from './modules/registration/components/appl-doc-upload/appl-doc-upload.component';
import { ApplAccountComponent } from './modules/registration/components/appl-account/appl-account.component';
import { ApplSecurityComponent } from './modules/registration/components/appl-security/appl-security.component';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: { breadcrumb: 'Home'}
  },
  {
    path: 'moh-profile',
    component: ApplProfileComponent,
    data: { breadcrumb: 'Profile'}
  },
  {
    path: 'moh-doc-upload',
    component: ApplDocUploadComponent,
    data: { breadcrumb: 'Upload Documents'}
  },
  {
    path: 'moh-account',
    component: ApplAccountComponent,
    data: { breadcrumb: 'Account'}
  },
  {
    path: 'moh-security',
    component: ApplSecurityComponent,
    data: { breadcrumb: 'Security'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
