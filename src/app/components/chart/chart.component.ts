import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router } from '@angular/router';
import {ChartService} from '../../../services/chart.service';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(
      private chartService: ChartService,
      private router: Router,
      private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.chartService.getData({time: 'day', start: '2019-01-17'}).subscribe((data: any) => {
      console.log(data);
      const  ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
      const ch = new Chart(ctx, {
        type: 'line',
        data: {
          labels: data.labels,
          color: ['red', 'pink', 'violet'],
          datasets: [
            {
              label: 'repeat',
              data: data.repeat,
              pointRadius: 0,
              borderColor: '#f30c56',
              borderWidth: 2,
              backgroundColor: 'rgba(250,30,99,0.03)',

            },
            {
              label: 'new',
              data: data.new,
              pointRadius: 0,
              borderColor: 'green',
              borderWidth: 2,
              backgroundColor: 'rgba(30,250,99,0.03)',
            },
            {
              label: 'members',
              data: data.members,
              pointRadius: 0,
              borderColor: 'blue',
              borderWidth: 2,
              backgroundColor: 'rgba(30,99,250,0.03)',
            },
          ]
        },
        options: {
          scales: {
          yAxes: [{
            display: false,
            gridLines: {
              display: false
            },
          }],
          xAxes: [{
            gridLines: {
              display: false
            },
          }]},
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 3,
              fontColor: 'grey',
              pointStyle: 'circle'
            }
          },
        }
      });
    });

  }
  onChange(e) {
    if (e.detail.value === 1) {
      this.chartService.getData({time: 'day', start: '2019-01-17'}).subscribe((data: any) => {
        const  ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
        const ch = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            color: ['red', 'pink', 'violet'],
            datasets: [
              {
                label: 'repeat',
                data: data.repeat,
                pointRadius: 0,
                borderColor: '#f30c56',
                borderWidth: 2,
                backgroundColor: 'rgba(250,30,99,0.03)',

              },
              {
                label: 'new',
                data: data.new,
                pointRadius: 0,
                borderColor: 'green',
                borderWidth: 2,
                backgroundColor: 'rgba(30,250,99,0.03)',
              },
              {
                label: 'members',
                data: data.members,
                pointRadius: 0,
                borderColor: 'blue',
                borderWidth: 2,
                backgroundColor: 'rgba(30,99,250,0.03)',
              },
            ]
          },
          options: {
            scales: {
              yAxes: [{
                display: false,
                gridLines: {
                  display: false
                },
              }],
              xAxes: [{
                gridLines: {
                  display: false
                },
              }]},
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 3,
                fontColor: 'grey',
                pointStyle: 'circle'
              }
            },
          }
        });
      });
    }
    if (e.detail.value === 2) {
      this.chartService.getData({time: 'week', start: '2019-01-17'}).subscribe((data: any) => {
        const  ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
        const ch = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            color: ['red', 'pink', 'violet'],
            datasets: [
              {
                label: 'repeat',
                data: data.repeat,
                pointRadius: 0,
                borderColor: '#f30c56',
                borderWidth: 2,
                backgroundColor: 'rgba(250,30,99,0.03)',

              },
              {
                label: 'new',
                data: data.new,
                pointRadius: 0,
                borderColor: 'green',
                borderWidth: 2,
                backgroundColor: 'rgba(30,250,99,0.03)',
              },
              {
                label: 'members',
                data: data.members,
                pointRadius: 0,
                borderColor: 'blue',
                borderWidth: 2,
                backgroundColor: 'rgba(30,99,250,0.03)',
              },
            ]
          },
          options: {
            scales: {
              yAxes: [{
                display: false,
                gridLines: {
                  display: false
                },
              }],
              xAxes: [{
                gridLines: {
                  display: false
                },
              }]},
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 3,
                fontColor: 'grey',
                pointStyle: 'circle'
              }
            },
          }
        });
      });
    }
    if (e.detail.value === 3) {
      this.chartService.getData({time: 'month', start: '2019-01-17'}).subscribe((data: any) => {
        const  ctx = (<HTMLCanvasElement>document.getElementById('myChart')).getContext('2d');
        const ch = new Chart(ctx, {
          type: 'line',
          data: {
            labels: data.labels,
            color: ['red', 'pink', 'violet'],
            datasets: [
              {
                label: 'repeat',
                data: data.repeat,
                pointRadius: 0,
                borderColor: '#f30c56',
                borderWidth: 2,
                backgroundColor: 'rgba(250,30,99,0.03)',

              },
              {
                label: 'new',
                data: data.new,
                pointRadius: 0,
                borderColor: 'green',
                borderWidth: 2,
                backgroundColor: 'rgba(30,250,99,0.03)',
              },
              {
                label: 'members',
                data: data.members,
                pointRadius: 0,
                borderColor: 'blue',
                borderWidth: 2,
                backgroundColor: 'rgba(30,99,250,0.03)',
              },
            ]
          },
          options: {
            scales: {
              yAxes: [{
                display: false,
                gridLines: {
                  display: false
                },
              }],
              xAxes: [{
                gridLines: {
                  display: false
                },
              }]},
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              }
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 3,
                fontColor: 'grey',
                pointStyle: 'circle'
              }
            },
          }
        });
      });
    }
  }
  prevChart() {
    this.chartService.prevData({time: 'day', start: '2019-01-17'}).subscribe((data: any) => {
      console.log(data);
    });
  }
  nextChart() {
    this.chartService.nextData({time: 'day', start: '2019-01-17'}).subscribe((data: any) => {
      console.log(data);
    });
  }
  pushMapPage() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/map']);
  }
  pushMessagePage() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/message']);
  }

  pushSettingsPage() {
    this.modalCtrl.dismiss();
    this.router.navigate(['/settings']);
  }
  closeModalPlace() {
    this.modalCtrl.dismiss();
  }

}
