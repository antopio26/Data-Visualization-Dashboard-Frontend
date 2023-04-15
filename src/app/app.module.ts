import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GraphWidgetComponent } from './components/graph-widget/graph-widget.component';
import { ThreeWidgetComponent } from './components/three-widget/three-widget.component';

import { SocketProviderService } from './services/socket-provider.service';
import { PresetManagerService } from './services/preset-manager.service';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphWidgetComponent,
    ThreeWidgetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridsterComponent,
    GridsterItemComponent,
    FontAwesomeModule
  ],
  providers: [
    SocketProviderService,
    PresetManagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
