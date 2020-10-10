import {
  APP_INITIALIZER,
  NgModule,
  ModuleWithProviders
 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzMessageModule } from 'ng-zorro-antd/message';
import { JwtModule } from '@auth0/angular-jwt';
import { ServerErrorInterceptor } from './interceptors/server_error.interceptor';
import { HttpConfigInterceptor } from './interceptors/http_config.interceptor';
import { SharedModule } from '../shared/shared.module';

import { environment } from '../../environments/environment';
import { AuthService } from './auth/auth.service';
import { LayoutService } from './services/layout.service';


// import { LayoutModule } from './components/layout/layout.module';
// import { PageModule } from './components/page/page.module';
// import { ToolbarModule } from './components/toolbar/toolbar.module';

export function tokenGetter() {
  return localStorage.getItem(environment.auth.tokenName);
}
export function initializeApp(authService: AuthService) {
  return (): Promise<any> => {
    return authService.init();
  }
}

const PROVIDERS = [];

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    NzMessageModule,
    JwtModule.forRoot({
      config: {
        throwNoTokenError: false,
        headerName: environment.auth.headerName,
        tokenGetter: tokenGetter,
        allowedDomains: [
          'localhost',
          'ifund-dev.iscreen.com',
          'ifund-qa.iscreen.com',
          'ifund.iscreen.com',
        ],
        disallowedRoutes: []
      }
    }),
  ],
  exports: [
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfigInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [AuthService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (latoutService: LayoutService) => () => latoutService.init(),
      multi: true,
      deps: [LayoutService]
    }
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}