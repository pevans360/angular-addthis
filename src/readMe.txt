The addThis component in the footer of app.component.html.  

To duplicate the problem using Chrome: 
1) The 'First' page is displayed by default.  View the AddThis link (I usually use Gmail).  Link is 'http://test.resourceAnalytix.com/newClient/firstpage?marketAreaID=18&propertyTypeID=1#.XDO82BXnlK8.gmail'.  
2) Note that the page name (just before the ?) is "firstpage".
3) Navigate from First page to Another page using links at top of page
4) Click on the + Gmail AddThis button.  The link shown is the same as above with "firstpage" as the page name.  This is incorrect ... the page name should be "anotherpage".  
5) Right-click on the AddThis buttons and choose Inspect from the context menu.
6) In the Inspector on the Elements tab, scroll to the div with the AddThis links.  You will see that addthis:url has a link similar to above EXCEPT that the page name is "anotherpage".  
7) In other words, the link in the Inspector has the correct page name, but the link that is shared has the original (and incorrect) page name.  


Also, I think AddThis should provide an NPM package with Typescript support.  Or at least Typescript declaration files so developers would get some tool support.  

Notes on implementation:
1) The AddThis implementation is in addThis.component.  
2) On navigation, the Angular router event is intercepted in app.component.ts.  The new page name is stored in a shared service (simpleState).  The addThis component is informed of the page change through an rxjs Subject/Observable (pageChange) in simpleState.  
3) Key events are written to the console log.



