import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GridsterConfig, GridsterConfigService, GridsterItem, GridType }  from 'angular-gridster2';

import { LayoutManagerService } from 'src/app/services/layout-manager.service';
import { ShellBridgeService } from 'src/app/services/shell-bridge.service';

@Component({
  selector: 'app-dashboard',
  host: {
    class: "flex-auto"
  },
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DashboardComponent implements OnInit {

  public options: GridsterConfig = GridsterConfigService;
  public dashboard: Array<any> = [];

  public editMode = false;

  constructor(private presets: LayoutManagerService, private shell: ShellBridgeService) {
    shell.commands.subscribe((command) => {
      switch (command) {
        case 'edit':
          this.setEditMode(true);
          break;
        case 'save':
          this.setEditMode(false);
          break;
        case 'cancel':
          this.setEditMode(false);
          break;
      }
    });
  }

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

    this.dashboard = this.presets.loadLayout('test');
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