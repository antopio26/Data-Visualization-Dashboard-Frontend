import { Component } from '@angular/core';
import { SocketManagerService } from 'src/app/services/socket-manager.service';
import { SharedSocket } from 'src/app/classes/shared-socket';
import { MessageService } from 'primeng/api';

import _ from 'lodash';


@Component({
  selector: 'app-socket-page',
  templateUrl: './socket-page.component.html',
  styleUrls: ['./socket-page.component.scss'],
  providers: [MessageService]
})
export class SocketPageComponent {
  
    public sockets = this.socketManager.sockets;
    public visible: boolean = false;

    public newSocket: {name: string, url: string} = {name: '', url: ''};

    constructor(public socketManager: SocketManagerService, public messageService: MessageService) {}

    onRowEditInit(socket: SharedSocket) {
      this.sockets = _.cloneDeep(this.socketManager.sockets);
    }

    onRowEditSave(socket: SharedSocket) {
      this.socketManager.changeSocketUrl(socket.name, socket.url);
      this.sockets = this.socketManager.sockets;
    }

    onRowEditCancel(socket: SharedSocket, index: number) {
      this.sockets = this.socketManager.sockets;
    }

    showAddDialog() {
      this.visible = true;
    }

    saveSocket(socket: {name: string, url: string}) {
      try {
        this.socketManager.addSocket(socket.name, socket.url);
      } catch (error) {
        this.messageService.add({severity:'error', summary:'Error', detail:'Could not add socket'});
      }
      this.sockets = this.socketManager.sockets;
      this.visible = false;
      this.newSocket = {name: '', url: ''};
    }

    hideDialog() {
      this.visible = false;
      this.newSocket = {name: '', url: ''};
    }

    deleteSocket(socket: SharedSocket) {
      console.log(socket);
      try {
        this.socketManager.removeSocket(socket.name);
      } catch (error) {
        this.messageService.add({severity:'error', summary:'Error', detail:'Could not remove socket'});
      }
      this.sockets = this.socketManager.sockets;
    }

}
