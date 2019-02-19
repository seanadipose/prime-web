import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Prime';

  constructor( private router: Router,
               private activatedRoute: ActivatedRoute,
               private titleService: Title ) {
  }

  ngOnInit() {
    this.updateTitleOnRouteChange();
  }

  /**
   * Listen to every route change, and update the page title based on the
   * 'title' property in the route's data.
   */
  private updateTitleOnRouteChange() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe((data: { title?: string }) => {
      this.setTitle(data.title);
    });
  }

  /** Set the page title. Includes basic formatting and fallback */
  private setTitle(title?: string) {
    if ( title ) {
      this.titleService.setTitle(`Prime | ${title}`);
    } else {
      // Default title
      this.titleService.setTitle( this.title );
    }
  }
}
