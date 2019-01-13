import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FirstPageComponent } from './firstPage.component';
import { AnotherPageComponent } from './anotherPage.component';


@NgModule({
  declarations: [ ],
  imports: [
    RouterModule.forRoot([
      { path: 'firstpage', component: FirstPageComponent },
      { path: 'anotherpage', component: AnotherPageComponent },
      { path: '**', redirectTo: 'firstpage' }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}