import { Component, OnInit } from '@angular/core';

// Development purpose
import { DummyDataService } from '../../../../services/dummy-data.service';
import { RegistrationDataService } from '@prime-registration/services/registration-data.service';
import { AbstractForm } from 'moh-common-lib/models';
import { Router } from '@angular/router';
import { PrimeConstants } from '@prime-core/models/prime-constants';
import { RegCacheService } from '../../../../services/reg-cache.service';

@Component({
  selector: 'app-bcsc-profile',
  templateUrl: './bcsc-profile.component.html',
  styleUrls: ['./bcsc-profile.component.scss']
})
export class BcscProfileComponent extends AbstractForm implements OnInit {

  private _firstNameCtrl = 'first_name';
  private _preferredFirstNameCtrl = 'preferred_first_name';
  private _preferredLastNameCtrl = 'preferred_last_name';

  private _requiredError = {required: true};

  constructor( private dummyDataService: DummyDataService,
               private registrantService: RegistrationDataService,
               private regCacheService: RegCacheService,
               protected router: Router ) {
    super( router );

    // Development purposes
    registrantService.registrant.copy(this.dummyDataService.getBcscRegistrant());
  }

  ngOnInit() {}

  get registrant() {
    return  this.registrantService.registrant;
  }

  get cache() {
    return this.regCacheService;
  }

  continue() {
    // Errors exist on form
    if (this.form.invalid) {
      // Mark all fields as touched to display errors
      this.markAllInputsTouched();
      return;
    }

    // Check preferred names
    this.checkPreferredNames();

    if ( this.form.valid ) {
      this.navigate( PrimeConstants.BCSC_REGISTRATION + '/' + PrimeConstants.ACCOUNT_PG );
    }
  }


  private checkPreferredNames() {
    const hasPreferFirstName = !!this.form.controls[this._preferredFirstNameCtrl].value;
    const hasPreferLastName = !!this.form.controls[this._preferredLastNameCtrl].value;
    const hasFirstName = !!this.form.controls[this._firstNameCtrl].value;

    // If either preferred name is entered and user has firstname, both must be entered.
    if ( hasFirstName ) {

      if ( hasPreferFirstName && !hasPreferLastName ) {
        this.setCntrolError( this._preferredLastNameCtrl, this._requiredError );
      } else if ( !hasPreferFirstName && hasPreferLastName ) {
        this.setCntrolError( this._preferredFirstNameCtrl, this._requiredError );
      } else {
        this.setCntrolError( this._preferredLastNameCtrl, null );
        this.setCntrolError( this._preferredFirstNameCtrl, null );
      }
    }
  }

  private setCntrolError( ctrlName: string, error: any ) {
    this.form.controls[ctrlName].setErrors( error );
    this.form.controls[ctrlName].markAsTouched();
  }
}
