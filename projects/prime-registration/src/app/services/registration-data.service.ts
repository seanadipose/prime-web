import { Injectable } from '@angular/core';
import { Registrant } from '@prime-registration/modules/registration/models/registrant.model';
import { Document } from 'prime-core';
import { CANADA } from 'moh-common-lib';

@Injectable()
export class RegistrationDataService {

  // Information pertaining to registrant
  public registrant: Registrant;

  // TODO - CHANGE! Needs to be a nested array and first type should be meta-data (e.g. driver's license? passport?)
  public documents: Document[];

  // List of the user's names to be used during password verification
  public userNameList: string[];

  constructor() {
    // Data for registrants
    this.registrant = new Registrant();
    this.documents = [];
  }

  /**
   * Checks if the address the registrant entered is Canadian
   */
  isCanada(): boolean {
    if (!this.registrant.address.country) {
      return true; // Default to Canada
    } else if (this.registrant.identityIsMailingAddress) {
      return this.registrant.address.country === CANADA;
    }
    return this.registrant.mailAddress.country === CANADA;
  }
}
