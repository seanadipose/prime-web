import { Injectable } from '@angular/core';
import { UserAttrPayload } from '../models/register-api.model';
import { ServerPayload } from 'prime-core';

@Injectable({
  providedIn: 'root'
})
export class RegisterRespService {

  public payload: ServerPayload | UserAttrPayload;

  constructor() { }


}
