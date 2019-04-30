import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnrolmentRoutingModule } from './enrolment-routing.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactComponent } from './pages/contact/contact.component';
import { SelfDeclarationComponent } from './pages/self-declaration/self-declaration.component';
import { OrganizationComponent } from './pages/organization/organization.component';
import { ReviewComponent } from './pages/review/review.component';
import { EnrolmentComponent } from './enrolment.component';
import { CoreModule } from '@prime-prov/core/core.module';

@NgModule({
  declarations: [
    ProfileComponent,
    ContactComponent,
    SelfDeclarationComponent,
    OrganizationComponent,
    ReviewComponent,
    EnrolmentComponent
  ],
  imports: [CommonModule, EnrolmentRoutingModule, CoreModule]
})
export class EnrolmentModule {}