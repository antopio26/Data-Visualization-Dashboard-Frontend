import { Component } from '@angular/core';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { SharedSocket } from 'src/app/classes/shared-socket';

@Component({
  selector: 'app-socket-page',
  templateUrl: './socket-page.component.html',
  styleUrls: ['./socket-page.component.scss']
})
export class SocketPageComponent {
  
    private clonedSockets: Record<string, any> = {};
    public sockets = this.socketManager.sockets;

    constructor(public socketManager: SocketManagerService) {}

    onRowEditInit(socket: SharedSocket) {
      this.clonedSockets[socket.name] = { ...socket };
      console.log(this.clonedSockets)
    }

    onRowEditSave(socket: SharedSocket) {
      // update socket url
      delete this.clonedSockets[socket.name];
    }

    onRowEditCancel(socket: SharedSocket, index: number) {
        this.sockets[index] = this.clonedSockets[socket.name];
        delete this.clonedSockets[socket.name];
    }

}
