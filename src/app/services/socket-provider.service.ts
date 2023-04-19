//write comments

import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, count } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketProviderService {

  public sockets: Record<string, Socket> = {};
  public socketKeys: string[] = [];
  public socketCaptures: Record<string, number> = {};
  public eventObservables: Record<string, Observable<unknown>> = {};

  constructor() { }

  updateSocketKeys() {
    this.socketKeys = Object.keys(this.sockets);
  }

  addSocket(socketName: string, socketUrl: string, socketOptions: any = {}) {
    this.sockets[socketName] = new Socket({ url: socketUrl, options: socketOptions });
    this.socketCaptures[socketName] = 0;
    this.updateSocketKeys();
  }

  removeSocket(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    if(this.socketCaptures[socketName] > 0) {
      throw new Error('Socket is captured');
    }
    delete this.sockets[socketName];
    delete this.socketCaptures[socketName];
    this.updateSocketKeys();
  }

  // Error when no socket is found
  findSocket(socketUrl: string) {
    return Object.keys(this.sockets).find((socketName) => {
      return this.sockets[socketName].ioSocket.io.uri === socketUrl;
    });
  }

  getSocket(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    return this.sockets[socketName];
  }

  getSocketUrl(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    return this.sockets[socketName].ioSocket.io.uri;
  }

  getSocketStatus(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    return this.sockets[socketName].ioSocket.connected;
  }

  captureSocket(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    if(this.socketCaptures[socketName] === 0) {
      this.connectSocket(socketName);
    }
    this.socketCaptures[socketName]++;
  }

  releaseSocket(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    if(this.socketCaptures[socketName] === 0) {
      throw new Error('Socket not captured');
    }
    this.socketCaptures[socketName]--;
    if(this.socketCaptures[socketName] === 0) {
      this.disconnectSocket(socketName);
      console.log(this.sockets[socketName]);
    }
  }

  private connectSocket(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    if(this.sockets[socketName].ioSocket.connected) {
      return;
    }
    this.sockets[socketName].connect();
  }

  private disconnectSocket(socketName: string) {
    if(!this.sockets[socketName]) {
      throw new Error('Socket not found');
    }
    if(!this.sockets[socketName].ioSocket.connected) {
      return;
    }
    this.sockets[socketName].disconnect();
  }

  event(socketName: string, eventName: string) {
    let observableId: string = socketName + '-' + eventName;

    if(!this.eventObservables[observableId]) {
      this.eventObservables[observableId] = this.sockets[socketName].fromEvent(eventName);
    }

    return this.eventObservables[observableId];
  }

  saveSocket(socketName: string, socketUrl: string, socketOptions: any = {}) {
    localStorage.setItem(socketName, JSON.stringify({ url: socketUrl, options: socketOptions }));
    localStorage.setItem('sockets', JSON.stringify([...this.listSavedSockets(), socketName]));
  }

  listSavedSockets() {
    let loscketList = localStorage.getItem('sockets');
    if(!loscketList) {
      localStorage.setItem('sockets', '[]');
      return [];
    }
    return JSON.parse(loscketList);
  }

  loadSockets() {
    this.listSavedSockets().forEach((socketName: string) => {
      let socketData = JSON.parse(localStorage.getItem(socketName) || '{}');
      this.addSocket(socketName, socketData.url, socketData.options);
    });
  }

  deleteSocket(socketName: string) {
    localStorage.removeItem(socketName);
  }

  clearSockets() {
    this.listSavedSockets().forEach((socketName: string) => {
      this.deleteSocket(socketName);
    });
  }
}