import { Injectable } from '@angular/core';
import { HttpHeaders, HttpErrorResponse, HttpParams, HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import * as moment from 'moment';
import { environment } from '../../../projects/prime-registration/src/environments/environment';
import { CountriesInterface } from '../models/api-base.model';
import { AbstractHttpService } from 'moh-common-lib/services';


@Injectable({
  providedIn: 'root'
})
export class ApiService extends AbstractHttpService {

  /**
   *  Default hardcoded header values.  Note: Authentication headers are added
   *  at runtime in the httpOptions() method.
   */
  protected _headers: HttpHeaders = new HttpHeaders();
  protected _options: HttpParams;

  constructor( protected http: HttpClient ) {
    super( http );
  }

  // Cache requests
  getCountries() {
    const url = environment.cacheAPIUrl + 'countries';

    return this.get<CountriesInterface>(url);
  }




  /**
   *
   * @param error
   */
  protected handleError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // Client-side / network error occured
      console.error('An error occured: ', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);
    }
     // A user facing error message /could/ go here; we shouldn't log dev info through the throwError observable
     return throwError( 'Unable to process request!' );
  }

  // Private functions

  /**
   * Returns current date in YYYYMMDD, e.g. '20180801'
   */
  private getProcessDate(): string {
    return moment().format('YYYYMMDD');
  }
}
