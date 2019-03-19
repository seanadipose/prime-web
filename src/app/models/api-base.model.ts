import { CountryList } from '../../../projects/prime-registration/src/app/modules/registration/components/address/address.component';

export enum ApiStatusCodes {
  SUCCESS = '0',
  ERROR = '1',
  WARNING = '2'
}

export interface PayloadInterface {

  /**
   * Unique identifier generated by the front end application for each request
   * session
   */
  eventUUID: string;

  /**
   * Default application name
   */
  clientName: string;

  /**
   * Date the JSON message was created. Date format dictated by value in DB System
   * Parameter table for DATE_FORMAT (i.e. YYYYMMDD) parameter
   */
  processDate: string;


  /**
   * Return value
   */
  statusCode?: string;
}


/**
 * Get Cache countries
 */
export interface CountriesInterface extends PayloadInterface {
  counties: CountryList[];
}



export class ServerPayload implements PayloadInterface {
  eventUUID: string;
  clientName: string;
  processDate: string;
  statusCode: string;


  constructor(payload: PayloadInterface) {

    this.eventUUID = payload.eventUUID;
    this.clientName = payload.clientName;
    this.processDate = payload.processDate;
    this.statusCode = payload.statusCode;
  }

  get success(): boolean {
    return this.statusCode === ApiStatusCodes.SUCCESS;
  }

  get error(): boolean {
    return this.statusCode === ApiStatusCodes.ERROR;
  }

  get warning(): boolean {
    return this.statusCode === ApiStatusCodes.WARNING;
  }
}


export class CountriesPayLoad extends ServerPayload {
  countries: CountryList[];

  constructor( payload: CountriesInterface ) {
    super(payload);
    this.countries = payload.counties;
  }
}
