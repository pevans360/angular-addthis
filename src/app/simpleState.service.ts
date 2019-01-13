import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SimpleStateService {
  pageName = '';
  clientUrlSegment = 'newClient';
  areaID = 18;
  typeID = 1;

  // Events
  private pageChangeSubject: Subject<any> = new Subject<any>();
	pageChange$ = this.pageChangeSubject.asObservable();
  pageChanged(newPage: string) {
		this.pageChangeSubject.next(newPage);
	}

  refreshAddThis() {
    // From: https://gist.github.com/jonathanconway/9925286
    if (window["addthis"] != null) {
      console.log('addThis.refresh - addthis null/undefined ... adding');
      // Load addThis, if it hasn't already been loaded.
      window['addthis_config'] = { 'data_track_addressbar' : false, 'pubid' : 'ra-5c2bf6b040727c90' };
      let bodyElem = document.getElementsByTagName('body')[0];
      let scriptElem = document.createElement('script');
      scriptElem.src = '//s7.addthis.com/js/300/addthis_widget.js';
      scriptElem.type = 'text/javascript'
      bodyElem.appendChild(scriptElem);
      if (window["addthis"] != null) {
        console.log('addthis added successfully');
      } else {
        console.log('attempt to add addthis failed');
      }
    } else {
       console.log('addThis.refresh - addthis is available');
      // Already loaded? Then re-attach it to the newly rendered set of social icons.
      // And reset share url/title, so they don't carry-over from the previous page.
      //window['addthis_share'].url = 'this.is.my.url'; //window.location.href;
      //window['addthis_share'].title = 'My AddThis Title';
      //window.addthis.toolbox('.addthis_toolbox');
    }
  }
}