import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { SharedModule } from '../shared/shared.module';
// import { CoreModule } from '../core/core.module';
import { ExceptionRoutingModule } from './exception-routing.module';
import { ExceptionComponent } from './exception.component';

@NgModule({
  imports: [
    CommonModule,
    NzButtonModule,
    SharedModule,
    ExceptionRoutingModule
  ],
  declarations: [ExceptionComponent]
})
export class ExceptionModule { }
