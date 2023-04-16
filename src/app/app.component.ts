import { Component } from '@angular/core';
import { SocketProviderService } from './services/socket-provider.service';
import { LayoutManagerService } from './services/layout-manager.service';

import DashboardConfig from 'src/assets/dashboard-config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = '3D-Visualization-Frontend';

  constructor(private sockets: SocketProviderService, private presets: LayoutManagerService) {
    this.sockets.addSocket('backend', 'http://localhost:5050');

    this.presets.saveLayout('test', DashboardConfig);
  }
}
