import { Component, OnInit, OnChanges } from '@angular/core';
import { AbstractForm } from 'moh-common-lib/models';
import { Router } from '@angular/router';

@Component({
  selector: 'prime-moh-profile',
  templateUrl: './moh-profile.component.html',
  styleUrls: ['./moh-profile.component.scss']
})
export class MohProfileComponent  extends AbstractForm implements OnInit {

  constructor( protected router: Router ) {
    super( router );
  }

  ngOnInit() {
  }

  continue() {

    console.log( 'Form: ' + this.form );

    // Errors exist on form
    if ( this.form.invalid ) {

      // Mark all fields as touched to display errors
      Object.keys(this.form.form.controls).forEach( x => {
        this.form.form.get( x ).markAsTouched();
      });
      return;
    }

    // All required fields have data


    // TODO: Check if first name does not exist - ask if have first name

    // Navigate to next page
    this.navigate( 'moh-registration/upload-documents' );

  }
}
