import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  protected sidebarCollapsed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public collapsed$ : Observable<boolean> = this.sidebarCollapsed$;

  constructor() {
  }

  init() {
    return new Promise<void>((resolve, reject) => {
      const collapsed: boolean = (/true/i).test(localStorage.getItem('sidebarCollapsed'));
      this.sidebarCollapsed$.next(collapsed);
      resolve()
    });
  }

  public collapsedChange() {
    const collapsed: boolean = (/true/i).test(localStorage.getItem('sidebarCollapsed'));
    localStorage.setItem('sidebarCollapsed', `${!collapsed}`);
    this.sidebarCollapsed$.next(!collapsed);
  }
}
