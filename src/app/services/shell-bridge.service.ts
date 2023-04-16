import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShellBridgeService {

  public commands: Subject<string> = new Subject<string>();

  constructor() { }
}
