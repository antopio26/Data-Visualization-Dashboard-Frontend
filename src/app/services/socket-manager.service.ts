//write comments

import { Injectable } from '@angular/core';
import { SharedSocket, SocketStatus } from '../classes/shared-socket';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketManagerService {

  private _sockets: Record<string, SharedSocket> = {};

  public socketKeys: string[] = [];
  get sockets(): SharedSocket[] {
    return Object.values(this._sockets);
  }

  constructor() { }

  private updateSocketKeys() {
    this.socketKeys = Object.keys(this._sockets);
  }

  addSocket(socketName: string, socketUrl: string, socketOptions: any = {}): void {
    this._sockets[socketName] = new SharedSocket(socketName, socketUrl, socketOptions);
    this.updateSocketKeys();
  }

  removeSocket(socketName: string): void {
    if(!this._sockets[socketName]) {
      throw new Error('Socket not found');
    }
    if(this._sockets[socketName].captures > 0) {
      throw new Error('Socket is captured');
    }
    delete this._sockets[socketName];
    this.updateSocketKeys();
  }

  getSocket(socketName: string): SharedSocket {
    if(!this._sockets[socketName]) {
      throw new Error('Socket not found');
    }
    return this._sockets[socketName];
  }

  captureSocket(socketName: string): void {
    this.getSocket(socketName).capture();
  }

  releaseSocket(socketName: string): void {
    this.getSocket(socketName).release();
  }

  event(socketName: string, eventName: string) {
    return this.getSocket(socketName).event(eventName);
  }

  saveSocket(socketName: string, socketUrl: string, socketOptions: any = {}) {
    localStorage.setItem(socketName, JSON.stringify({ url: socketUrl, options: socketOptions }));
    localStorage.setItem('sockets', JSON.stringify([...this.listSavedSockets(), socketName]));
  }

  deleteSocket(socketName: string) {
    localStorage.removeItem(socketName);
  }

  loadSockets() {
    this.listSavedSockets().forEach((socketName: string) => {
      let socketData = JSON.parse(localStorage.getItem(socketName) || '{}');
      this.addSocket(socketName, socketData.url, socketData.options);
    });
  }


  listSavedSockets() {
    let loscketList = localStorage.getItem('sockets');
    if(!loscketList) {
      localStorage.setItem('sockets', '[]');
      return [];
    }
    return JSON.parse(loscketList);
  }

  clearSockets() {
    this.listSavedSockets().forEach((socketName: string) => {
      this.deleteSocket(socketName);
    });
  }
}