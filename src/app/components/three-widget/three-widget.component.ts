import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-three-widget',
  templateUrl: './three-widget.component.html',
  styleUrls: ['./three-widget.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThreeWidgetComponent implements OnInit{

  @Input() public config: any;

  constructor() { }
  
  ngOnInit() { }

}
