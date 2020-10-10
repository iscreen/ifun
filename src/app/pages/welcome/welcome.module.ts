import { NgModule } from '@angular/core';

import { NzCardModule } from 'ng-zorro-antd/card';
import { SharedModule } from '../../shared/shared.module';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';


@NgModule({
  imports: [
    NzCardModule, SharedModule,
    WelcomeRoutingModule
  ],
  declarations: [WelcomeComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
