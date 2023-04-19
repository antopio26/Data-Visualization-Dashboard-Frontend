import { NgModule } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';


export enum SocketStatus {
    CONNECTED = 'connected',
    INACTIVE = 'inactive',
    UNREACHABLE = 'unreachable'
}

export class SharedSocket extends Socket {

    public captures: number = 0;
    public events: Record<string, Observable<unknown>> = {};
    public id: string = Math.random().toString(36).substring(2);

    get status(): SocketStatus {
        if(this.ioSocket.connected) {
            return SocketStatus.CONNECTED;
        } else if(this.captures > 0) {
            return SocketStatus.UNREACHABLE;
        } else {
            return SocketStatus.INACTIVE;
        }
    }

    constructor(public name: string, public url: string, public options: any = {}) {
        super({ url: url, options: options });
    }

    capture() {
        if(this.captures === 0) {
            this.connect();
        }
        this.captures++;
    }

    release() {
        this.captures--;
        if(this.captures === 0) {
            this.disconnect();
        }
    }

    event(eventName: string) {
        if(!this.events[eventName]) {
            this.events[eventName] = this.fromEvent(eventName);
        }
        return this.events[eventName];
    }
}