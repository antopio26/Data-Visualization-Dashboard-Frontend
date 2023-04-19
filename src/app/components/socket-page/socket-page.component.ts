import { Component } from '@angular/core';
import { SocketProviderService } from 'src/app/services/socket-provider.service';

@Component({
  selector: 'app-socket-page',
  templateUrl: './socket-page.component.html',
  styleUrls: ['./socket-page.component.scss']
})
export class SocketPageComponent {
  
    public logs: string[] = [];

    constructor(public socketProvider: SocketProviderService) { }

}
