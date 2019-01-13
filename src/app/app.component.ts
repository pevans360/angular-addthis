import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterEvent, ResolveEnd } from '@angular/router';
import { Observer, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SimpleStateService } from './simpleState.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, OnDestroy  {
  @ViewChild('addThisDiv') addThisDiv: ElementRef;
  routerSub: Subscription;
	unSubscribe = new Subject();
  name = 'Angular';
  addThis = window["addThisScript"];
  addThisUrl = 'test.resourceAnalytix.com';

  constructor(private router: Router,
       private simpleState: SimpleStateService) {}

  ngOnInit() {

    // When page changes, set the pageName in simpleState
    // and trigger a pageChanged event
    this.router.events.subscribe(evtIn => {
        let evt = <RouterEvent>evtIn;
        if (evt instanceof NavigationStart) {
          console.log('NavigationStart - url: ' + evt.url);
          let url = evt.url;
          // Set new page name
          let newPage = this.pageNameFromUrl(url);
          // Handle initial navigation
          if (newPage.trim().length === 0)
            newPage = 'firstpage';
          this.simpleState.pageName = newPage;
          this.simpleState.pageChanged(newPage);
          console.log('NavigationStart - after setting page name: ' + newPage);
        }

        if (evt instanceof ResolveEnd) {
          console.log('ResolveEnd - refreshing AddThis');
          this.simpleState.refreshAddThis();
        }        
      });
    }

  ngOnDestroy() {
		this.unSubscribe.next();
		this.unSubscribe.complete();
  }

  pageNameFromUrl(urlIn): string {
    // Url should be something like /clientUrlSegment/compare and maybe qString ?marketAreaID=18 ... etc.
    let retVal = 'home';
    const lastSlash = urlIn.lastIndexOf('/');
    let endPos = urlIn.indexOf('?');
    if (endPos < 0)
      endPos = urlIn.length;
    if (lastSlash >= 0 && endPos > lastSlash) {
      const strLen = endPos - (lastSlash + 1);
      retVal = urlIn.substr(lastSlash + 1, strLen);
    }
    return retVal;
  }
}
