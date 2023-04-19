// TODO: config DOCS

import { Component, AfterViewInit, OnDestroy, Input, ChangeDetectionStrategy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { SocketManagerService } from 'src/app/services/socket-manager.service';

Chart.register(...registerables);

@Component({
  selector: 'app-graph-widget',
  templateUrl: './graph-widget.component.html',
  styleUrls: ['./graph-widget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GraphWidgetComponent implements AfterViewInit, OnDestroy {
  
  public chart: any;
  public canvasId: string = 'canvas-' + Math.random().toString(36).substr(2, 9);

  @Input() public config: any;

  constructor(private sockets: SocketManagerService) {}

  ngAfterViewInit() {


    // Create chart
    this.createChart(this.canvasId);
    
    // Configure datasets
    this.configureDatasets();

    // Connect to data socket
    this.sockets.captureSocket(this.config.socket.name);           // config here 

    // Subscribe to data socket
    this.sockets.event(this.config.socket.name, this.config.socket.event).subscribe((data: any) => {      // config here
      let dataList = this.config.datasets.map((dataset: any) => data.value[dataset.key]);                 // config here
      this.addData('', dataList);
    });
  }

  ngOnDestroy() {
    this.sockets.releaseSocket(this.config.socket.name);           // config here
    this.chart.destroy();
  }

  private configureDatasets() {
    this.config.datasets.forEach((dataset: any) => {
      this.addDataset(dataset.label, dataset.color);              // config here
    });
  }

  private addDataset(label: string, color: string, data: Array<any> = []) {
    let dataset: any = {
      label: label,
      pointStyle: false,
      data: data
    };

    if(color) {
      dataset.borderColor = color;
      dataset.backgroundColor = color + '90';
    }

    this.chart.data.datasets.push(dataset);
  }

  private addData(label: any, data: Array<any>) {
    this.chart.data.labels.push(label);
    this.chart.data.datasets.forEach((dataset: any, index: number) => {
        dataset.data.push(data[index]);
    });

    if(this.chart.data.labels.length > 100) {
      this.chart.data.labels.shift();
      this.chart.data.datasets.forEach((dataset: any) => {
        dataset.data.shift();
      });
    }
    this.chart.update('none');
  }

  private createChart(id: string) {
    // TODO: maybe make configurable 
    let scalesOptions: any =  {
      x: {
        border: {
          display: false
        },
        grid: {
          display: false
        }
      },
      y: {
        border: {
          display: true
        },
        grid: {
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
        }
      }
    };

    let elementsOptions: any = {
      line: {
        tension: 0.3,
        borderWidth: this.config.lineWidth,                     // config here
      }
    };

    // TODO: maybe make configurable: legend ecc.
    let pluginsOptions: any = {
      title: {
        display: false
      },
      legend: {
        display: this.config.legend || true,
        position: 'bottom',
        maxHeight: 100,
      },
      decimation: {
        enabled: true,
        algorithm: 'min-max',
        threshold: 50
      },
      tooltip: {
        enabled: false,
      }
    }

    this.chart = new Chart(id, {
      type: 'line',
      data: { labels: [], datasets: [] },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: pluginsOptions,
        scales: scalesOptions,
        elements: elementsOptions,
        animation: { duration: 200 }
      },
    });
  }
}
