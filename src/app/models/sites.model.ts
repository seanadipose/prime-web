import { Base } from '../core/base/base.class';
import { Address, Role, Verifier, Person } from './prime.models';
import { EnrollmentStatus } from './prime.models';
import { BadgeLevel } from '../core/enrollment-row/enrollment-row.interface';
import * as moment from "moment";
import { convertToParamMap } from '@angular/router';

//-----------------------------------------------------------------------------
// SITES
//-----------------------------------------------------------------------------

// Locations for PRIME.
export class Site extends Base {
  name: string;
  address: Address;
  siteAccess: SiteAccess[];


  constructor() {
    super();
    this.siteAccess = [];
  }


  get users(): Person[] {
    return this.siteAccess.map(siteAccess => siteAccess.person)
      .filter(this.filterUnique)
  }

  get activeUsers(): Person[] {
    return this.siteAccess.filter(x => x.status === EnrollmentStatus.Active)
      .map(siteAccess => { return siteAccess.person})
      .filter(this.filterUnique)
  }

  getUsersForStatus(status: EnrollmentStatus){
    return this.siteAccess.filter(x => x.status === status)
      .map(siteAccess => { return siteAccess.person})
      .filter(this.filterUnique)
  }

  private filterUnique(x, i, a){
    return x && a.indexOf(x) === i
  }
}

// The record of a specific user's access to a specific site
export class SiteAccess extends Base {
  site: Site;
  // Displayed to user
  title: string;
  // person: Role;
  person: Person;
  status: EnrollmentStatus;
  reason: string;
  requestDate: Date; // when SiteRequest was initiated
  startDate: Date;
  endDate: Date;
  vendor: Vendor;
  personalAccessToPharmaNet: boolean;
  verifier: Verifier; // "by" in xlsx designs -  responsible for approving

  // In-progress
  progress: SiteAccessProgressSteps

  // Are there changes to the data made by the user that have not been submitted? NOTE: Rudimentary for now in prototype.
  pendingChanges: boolean;

  // the value must be a class itself (subclassing Role) - not an instance!
  // e.g. x.privilege = Verifier
  privilege: typeof Role;


  get alert(): EnrollmentAlert {
    return new EnrollmentAlert(this.status);
  }

  get daysUntilExpiry(): number {
    const expiry = moment(this.endDate);
    const today = moment();
    return expiry.diff(today, 'days');
  }

  get endDateShort(): string {
    return moment(this.endDate).format('DD/MM/YYYY');
  }

  formatDateShort(date: Date){
    return moment(date).format('DD/MM/YYYY');
  }
}
class Vendor extends Base { }

export class EnrollmentAlert {
  level: BadgeLevel;

  constructor(public status: EnrollmentStatus){
    this.level = EnrollmentAlert.convertStatusToBadgeLevel(status);
  }

  static convertStatusToBadgeLevel(status: EnrollmentStatus) : BadgeLevel {
    if (status === EnrollmentStatus.Pending){
        return BadgeLevel.Warning;
    }

    if (status === EnrollmentStatus.Expired){
        return BadgeLevel.Danger;
    }

    if (status === EnrollmentStatus.Declined){
        return BadgeLevel.Danger;
    }

    if (status === EnrollmentStatus.Initiated){
      return BadgeLevel.Info;
    }

    if (status === EnrollmentStatus.Incomplete){
      return BadgeLevel.Warning;
    }

    if (status === EnrollmentStatus.Active){
      return BadgeLevel.Success;
    }

    if (status === EnrollmentStatus.Returned){
      return BadgeLevel.Info;
    }

  }
}

/**
 * These are steps, IN ORDER, for a Site Request. Tied closely with EnrollmentProgressRowComponent
 */
export enum SiteAccessProgressSteps {
  Verifier = 'Verifier',
  Applicant = 'Applicant',
  MoH = "MoH",
  Provisioner = "Provisioner"
}