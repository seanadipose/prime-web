import { Injectable } from '@angular/core';
import { Registrant } from '../../registration/models/registrant.model';
import * as faker from 'faker';
import { UUID } from 'angular2-uuid';
import { CANADA, BRITISH_COLUMBIA } from 'moh-common-lib';
import {
  BCSCSessionInterface,
  AssuranceLevel,
  ProviderCode
 } from 'prime-core';

/**
 * Dummy data for development purposes
 *
 * mocks out a response from BCSC, only for dev
 */

@Injectable({
  providedIn: 'root'
})
export class BCSCDummyResponseService {

    private cities = ['Vancouver', 'Victoria', 'Langford'];

    constructor() {

    }

    /**
     * Generates a Registrant with pretend/random data from the BCSC login.
     */
    getBcscRegistrant(): Registrant {
        const data = this.getMockBCSCResponse();
        const reg = new Registrant();
        reg.firstName = data.firstname;
        reg.middleName = Math.random() > 0.5 ? faker.name.firstName() : undefined,
        reg.lastName = data.lastname;
        reg.dateOfBirth = {
          month: data.dateOfBirth.getMonth() + 1,
          day: data.dateOfBirth.getDay() + 1,
          year: data.dateOfBirth.getFullYear()
        };
        reg.address.street = data.street;
        reg.address.city = data.city;
        reg.address.province = BRITISH_COLUMBIA;
        reg.address.postal = data.postal;
        reg.address.country = data.country;
        reg.userAccountName = data.pdid;
        reg.assuranceLevel = AssuranceLevel.LEVEL_3;
        reg.providerCode = ProviderCode.BCSC;
        return reg;
    }

    /**
     * The idea is that this response if from BCSC after a successful OAuth
     * login.  However, we don't have BCSC OAuth setup yet, so we're just
     * mocking the response.
     *
     * Note: Some fields are not on the actual BCSC Response, like eventUUID and
     * clientName, but we'll be POSTING them up so they're generated here for
     * convenience.
     */
    getMockBCSCResponse(): IBCSCResponse {
      const pdid = UUID.UUID().replace( /-/g, '' );
        return {
          processDate: faker.date.past(),
          pdid: pdid.substring(0, 9),
          assuranceLevel: faker.random.number(),
          email: faker.internet.email(),
          mobile: faker.phone.phoneNumberFormat(2),
          firstname: faker.name.firstName(),
          lastname: faker.name.lastName(),
          givennames: faker.name.findName(),
          dateOfBirth: faker.date.between('1959-01-01', '1999-01-01'),
          street: faker.address.streetAddress(),
          city: this.generateFakeCity(),
          province: BRITISH_COLUMBIA,
          postal: faker.address.zipCode('?#? #?#'),
          country: CANADA
        };
    }


  public getBCSCSession(): BCSCSessionInterface {

    return {
      authTrxId: UUID.UUID().replace(/-/g, ''),
      authPartyId: 'urn:ca:bc:gov:ias:prd',
      authPartyName: 'IAS',
      userIdType: 'did',
      userType: 'VerifiedIndividual'
    };
  }

  private generateFakeCity() {
      const index = Math.floor(Math.random() * Math.floor(this.cities.length));
      return this.cities[index];
  }
}

export interface IBCSCResponse {
  processDate: Date;
  pdid: string;
  assuranceLevel: number;
  email: string;
  mobile: string;
  firstname: string;
  lastname: string;
  givennames: string;
  dateOfBirth: Date;
  street: string;
  city: string;
  province: string;
  postal: string;
  country: string;
}
