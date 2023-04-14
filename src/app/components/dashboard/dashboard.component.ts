import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GridsterConfig, GridsterConfigService, GridsterItem, GridType }  from 'angular-gridster2';

import { PresetManagerService } from 'src/app/services/preset-manager.service';

import { faPen, faSave } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {

  public options: GridsterConfig = GridsterConfigService;
  public dashboard: Array<any> = [];

  public faPen = faPen;
  public faSave = faSave;

  public editMode = false;

  constructor(private presets: PresetManagerService) {}

  ngOnInit() {
    this.options = {
      gridType: GridType.Fit,
      displayGrid: 'none',
      margin: 15,
      outerMarginTop: 20,
      outerMarginBottom: 20,
      outerMarginRight: 20,
      outerMarginLeft: 20,
      pushResizeItems: true,
      pushItems: true,
      compactType:  'compactUp&Left',
      resizable: { enabled: false },
      draggable: { enabled: false }
    };

    this.dashboard = this.presets.loadPreset('test');
  }

  changedOptions() {
    if (this.options.api && this.options.api.optionsChanged) {
      this.options.api.optionsChanged();
    }
  }

  setEditMode(editMode: boolean) {
    this.editMode = editMode;
    this.options.draggable = { enabled: editMode };
    this.options.resizable = { enabled: editMode };
    this.changedOptions();
  }

  toggleEditMode() {
    this.setEditMode(!this.editMode);
  }

}