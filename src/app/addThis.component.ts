import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SimpleStateService } from './simpleState.service';

@Component({
  selector: 'add-this',
  templateUrl: './addThis.component.html',
  styleUrls: []
})
export class AddThisComponent implements AfterViewInit  {
  @ViewChild('addThisDiv') addThisDiv: ElementRef;
  addThisUrl = "UrlNotSet";

  constructor(private simpleState: SimpleStateService) {
    // Subscribe to pageChange events - build and set new url
    simpleState.pageChange$.subscribe(newPage => {
      console.log('addThis.pageChangeSubscription - newPage: ' + newPage)
      console.log('addThis.pageChangeSubscription - refreshing addthis');      
      //this.simpleState.refreshAddThis();

      let url = this.buildUrl();
      this.setUrl(url);
    });
  }

  ngOnInit() {
		// this.addThisDiv.nativeElement.setAttribute('addthis:url', this.addThisUrl);
    //this.addThisUrl = 'test.resourceAnalytix.com?marketAreaID=18&propertyTypeID=1';

    let url = this.buildUrl();
    this.setUrl(url);
    console.log('addThis - ngOnInit - adding url: ' + url);
  }

  ngAfterViewInit() {
    // let url = this.buildUrl();
    // this.setUrl(url);
    
    // //addthis.layers.refresh();



    // //window.addthis.layers.refresh();
    // //Window.addthis.layers.refresh();
    // //this.addThis.layers.refresh();
    // //let x = this.addThis.layers.refresh();
    // //let y = this.addThis;
    // //console.log(y);
  }

  buildUrl(): string {
    console.log('addThis.buildUrl - page name: ' + this.simpleState.pageName);
    
    let url = 'http://test.resourceAnalytix.com';
    url += '/' + this.simpleState.clientUrlSegment;
    url += '/' + this.simpleState.pageName;
    url += '?' + 'marketAreaID=' + this.simpleState.areaID;
    url += '&' + 'propertyTypeID=' + this.simpleState.typeID;
    this.addThisUrl = url;

    return url;
  }

  setUrl(urlIn: string) {
    this.simpleState.refreshAddThis();
    // let addThisScripts = window["addthis"];
    // addThisScripts.addthis.init();
    // addThisScripts.addthis.layers.refresh();
    console.log('addThis - setUrl - url: ' + urlIn);
		this.addThisDiv.nativeElement.setAttribute('addthis:url',urlIn);
  }

  // refresh() {
  //   // From: https://gist.github.com/jonathanconway/9925286
  //   if (window["addthis"] != null) {
  //     console.log('addThis.refresh - addthis null/undefined ... adding');
  //     // Load addThis, if it hasn't already been loaded.
  //     window['addthis_config'] = { 'data_track_addressbar' : false, 'pubid' : 'ra-5c2bf6b040727c90' };
  //     let bodyElem = document.getElementsByTagName('body')[0];
  //     let scriptElem = document.createElement('script');
  //     scriptElem.src = '//s7.addthis.com/js/300/addthis_widget.js';
  //     scriptElem.type = 'text/javascript'
  //     bodyElem.appendChild(scriptElem);
  //     if (window["addthis"] != null) {
  //       console.log('addthis added successfully');
  //     } else {
  //       console.log('attempt to add addthis failed');
  //     }
  //   } else {
  //      console.log('addThis.refresh - addthis is available');
  //     // Already loaded? Then re-attach it to the newly rendered set of social icons.
  //     // And reset share url/title, so they don't carry-over from the previous page.
  //     //window['addthis_share'].url = 'this.is.my.url'; //window.location.href;
  //     //window['addthis_share'].title = 'My AddThis Title';
  //     //window.addthis.toolbox('.addthis_toolbox');
  //   }
  // }
}