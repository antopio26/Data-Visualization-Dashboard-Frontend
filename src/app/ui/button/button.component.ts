import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  	public buttonText = '';

	@Input()
	set text(name: string) {
		this.buttonText = name;
	}
	get name(): string {
		return this.buttonText;
	}

	@Input() btnStyle: string = 'primary';
	@Input() icon!: IconProp;
	@Input() type: string = 'button';
	@Input() isDisabled = false;

	@Output() btnClick = new EventEmitter();

	constructor() {}

	onClick() {
		this.btnClick.emit();
	}
}