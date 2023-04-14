/* TODO
    - Save preset
    - Load preset
    - Delete preset
    - List presets
    - Clear presets
*/

import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';

@Injectable({
  providedIn: 'root'
})

export class PresetManagerService {

  constructor() { }

  public savePreset(presetName: string, presetData: Array<any>) {
    // Set preset data
    localStorage.setItem(presetName, JSON.stringify(presetData));
    // Add preset name to list
    localStorage.setItem('presets', JSON.stringify([...this.listPresets(), presetName]));
  }

  public loadPreset(presetName: string): GridsterItem[] {
    return JSON.parse(localStorage.getItem(presetName) || '[]');
  }

  public listPresets() {
    return JSON.parse(localStorage.getItem('presets') || '[]');
  }

  public deletePreset(presetName: string) {
    localStorage.removeItem(presetName);
  }

  public clearPresets() {
    this.listPresets().forEach((presetName: string) => {
      this.deletePreset(presetName);
    });
  }
}
