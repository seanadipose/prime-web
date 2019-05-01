import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { RadioControlComponent } from './components/radio-control/radio-control.component';
import { SubheaderComponent } from './components/subheader/subheader.component';
import { DeclarationQuestionComponent } from './components/declaration-question/declaration-question.component';

@NgModule({
  declarations: [
    PageHeaderComponent,
    RadioControlComponent,
    SubheaderComponent,
    DeclarationQuestionComponent
  ],
  imports: [CommonModule],
  exports: [
    PageHeaderComponent,
    RadioControlComponent,
    SubheaderComponent,
    DeclarationQuestionComponent
  ]
})
export class SharedModule {}
