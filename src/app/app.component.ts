import { Component } from '@angular/core';
import { SocketManagerService } from './services/socket-manager.service';
import { LayoutManagerService } from './services/layout-manager.service';

import DashboardConfig from 'src/assets/dashboard-config.json';
import { ShellBridgeService } from './services/shell-bridge.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '3D-Visualization-Frontend';

  public selectedTab = 'dashboard';

  constructor(private sockets: SocketManagerService, private presets: LayoutManagerService, private shell: ShellBridgeService) {
    this.sockets.addSocket('backend', 'http://localhost:5050');

    this.presets.saveLayout('test', DashboardConfig);

    shell.commands.subscribe((command) => {
      switch (command) {
        case 'dashboard':
          this.selectedTab = 'dashboard';
          break;
        case 'sockets':
          this.selectedTab = 'sockets';
          break;
      }
    });
  }



}
