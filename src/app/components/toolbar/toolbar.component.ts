import { Component } from '@angular/core';
import { ShellBridgeService } from 'src/app/services/shell-bridge.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  constructor(private shell: ShellBridgeService) { }

  public editMode = false;
  public page = 'dashboard';

  gotoPage(page: string) {
    this.shell.commands.next(page);
    this.page = page;
  }

  edit() {
    this.shell.commands.next('edit');
    this.editMode = true;
  }

  save() {
    this.shell.commands.next('save');
    this.editMode = false;
  }

  cancel() {
    this.shell.commands.next('cancel');
    this.editMode = false;
  }
}
