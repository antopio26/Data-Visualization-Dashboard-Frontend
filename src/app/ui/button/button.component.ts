import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const BTN_CLASS = {
	primary: {
		button: "text-sm font-semibold bg-white text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50",
		icon: "text-gray-400",
	},
	secondary: {
		button: "text-sm font-semibold bg-gray-900 text-white shadow-sm ring-1 ring-inset ring-gray-500 hover:bg-gray-700",
		icon: "text-white",
	},
	success: {
		button: "text-sm font-semibold bg-green-100 text-green-800 shadow-sm ring-1 ring-inset ring-green-200 hover:bg-green-100",
		icon: "text-green-800",
	},
	danger: {
		button: "text-sm font-semibold bg-red-100 text-red-800 shadow-sm ring-1 ring-inset ring-red-200 hover:bg-red-100",
		icon: "text-red-800",
	},
	warning: {
		button: "text-sm font-semibold bg-yellow-100 text-yellow-800 shadow-sm ring-1 ring-inset ring-yellow-200 hover:bg-yellow-100",
		icon: "text-yellow-800",
	},
	info: {
		button: "text-sm font-semibold bg-blue-100 text-blue-800 shadow-sm ring-1 ring-inset ring-blue-200 hover:bg-blue-100",
		icon: "text-blue-800",
	}
}

@Component({
	selector: 'app-button',
	templateUrl: './button.component.html',
	styleUrls: ['./button.component.css']
})
export class ButtonComponent {
  	public buttonText = '';
	public buttonStyle: any = BTN_CLASS.primary;

	@Input()
	set text(name: string) {
		this.buttonText = name;
	}
	get name(): string {
		return this.buttonText;
	}

	@Input()
	set btnStyle(style: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info') {
		this.buttonStyle = BTN_CLASS[style];
	}
	get btnStyle(): 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' {
		return this.buttonStyle;
	}

	@Input() icon!: IconProp;
	@Input() type: string = 'button';
	@Output() btnClick = new EventEmitter();
	@Input() isDisabled = false;

	constructor() {}

	onClick() {
		this.btnClick.emit();
	}
}