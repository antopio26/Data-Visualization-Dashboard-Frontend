import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { GridsterComponent, GridsterItemComponent } from 'angular-gridster2';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { GraphWidgetComponent } from './components/graph-widget/graph-widget.component';
import { ThreeWidgetComponent } from './components/three-widget/three-widget.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SocketPageComponent } from './components/socket-page/socket-page.component';

import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    GraphWidgetComponent,
    ThreeWidgetComponent,
    ToolbarComponent,
    SocketPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GridsterComponent,
    GridsterItemComponent,
    FontAwesomeModule,
    TableModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
