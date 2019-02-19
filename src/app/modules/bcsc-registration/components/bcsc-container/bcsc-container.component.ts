import { Component, OnInit } from '@angular/core';
import { bcscPages } from '../../bcsc-registration-page-routing.module';
import { Router } from '@angular/router';
import { Container } from '../../../../shared-core/models/container';

@Component({
  selector: 'prime-bcsc-container',
  templateUrl: './bcsc-container.component.html',
  styleUrls: ['./bcsc-container.component.scss']
})
export class BcscContainerComponent extends Container implements OnInit {

  constructor( public router: Router ) {
    super();
    this.setProgressSteps( bcscPages );
  }

  ngOnInit() {
    console.log( 'bcsc-container  url: ' + this.router.url );
  }
}
