/* TODO
    - Save layout
    - Load layout
    - Delete layout
    - List layouts
    - Clear layouts
*/

import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})

export class LayoutManagerService {

  constructor() { }

  public saveLayout(layoutName: string, layoutData: Array<any>) {
    // Set layout data
    localStorage.setItem(layoutName, JSON.stringify(layoutData));
    // Add layout name to list
    localStorage.setItem('layouts', JSON.stringify([...this.listLayout(), layoutName]));
  }

  public loadLayout(layoutName: string): Array<any> {
    return JSON.parse(localStorage.getItem(layoutName) || '[]');
  }

  public listLayout(): Array<string> {
    return JSON.parse(localStorage.getItem('layouts') || '[]');
  }

  public deleteLayout(layoutName: string) {
    localStorage.removeItem(layoutName);
  }

  public clearLayout() {
    this.listLayout().forEach((layoutName: string) => {
      this.deleteLayout(layoutName);
    });
  }
}
