import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { ComponentsModule } from './components/components.module';

const COMPONENTS = [];

const PIPES = [];

const VALIDATORS = [];

const DIRECTIVES = [];

const PROVIDERS = [];

const RESOLVES = [];

/**
 * Do not specify providers for modules that might be imported by a lazy loaded module.
 */
@NgModule({
  declarations: [...COMPONENTS, ...DIRECTIVES, ...PIPES],
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    NzGridModule,
    NzModalModule,
    ...DIRECTIVES,
    ...PIPES,
    ...COMPONENTS
  ],
  providers: [...PROVIDERS]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [...PROVIDERS, ...RESOLVES, ...VALIDATORS]
    };
  }
}