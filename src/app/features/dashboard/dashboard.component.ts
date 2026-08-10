import {OnInit , Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import {HeroService} from "../../core/services/hero.service";

import {
  ChartComponent,
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexDataLabels,
  ApexGrid,
  ApexTooltip,
  ApexLegend,
  ApexResponsive,
  ApexNonAxisChartSeries
} from 'ng-apexcharts';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';

export interface TrendChartOptions {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  tooltip: ApexTooltip;
}

export interface DonutChartOptions {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  legend: ApexLegend;
  responsive: ApexResponsive[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgApexchartsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressBarModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

 

  @ViewChild('trendChart')
  trendChartRef!: ChartComponent;

  @ViewChild('donutChart')
  donutChartRef!: ChartComponent;

  //====================================================
  // Dashboard Counts
  //====================================================

  totalPoints = 1248;

  activeEmployees = 154;

  approvedRequests = 89;

  pendingRequests = 17;

  //====================================================
  // Leaderboard
  //====================================================

  leaders = [

    {
      initial: 'RM',
      name: 'Rahul Mehta',
      designation: 'Team Leader',
      department: 'Engineering',
      points: 980
    },

    {
      initial: 'AK',
      name: 'Abhineet Kumar',
      designation: 'Senior Developer',
      department: 'Engineering',
      points: 925
    },

    {
      initial: 'PS',
      name: 'Priya Sharma',
      designation: 'Project Manager',
      department: 'Delivery',
      points: 880
    },

    {
      initial: 'RJ',
      name: 'Rohan Joshi',
      designation: 'QA Lead',
      department: 'Testing',
      points: 815
    },

    {
      initial: 'NS',
      name: 'Neha Singh',
      designation: 'HR Manager',
      department: 'Human Resource',
      points: 790
    }

  ];

  //====================================================
  // Recent Requests
  //====================================================

  requests = [

    {
      employee: 'Rahul Mehta',
      category: 'Leadership',
      points: 50,
      status: 'Approved'
    },

    {
      employee: 'Abhineet Kumar',
      category: 'Innovation',
      points: 40,
      status: 'Pending'
    },

    {
      employee: 'Priya Sharma',
      category: 'Customer Focus',
      points: 30,
      status: 'Approved'
    },

    {
      employee: 'Neha Singh',
      category: 'Mentorship',
      points: 20,
      status: 'Rejected'
    }

  ];

  //====================================================
  // Charts
  //====================================================

  trendChart: TrendChartOptions = {

    series: [],

    chart: {
      type: 'line',
      height: 220,
      toolbar: {
        show: false
      }
    },

    xaxis: {
      categories: []
    },

    stroke: {
      curve: 'smooth',
      width: 4
    },

    dataLabels: {
      enabled: false
    },

    grid: {},

    tooltip: {}

  };

  donutChart: DonutChartOptions = {

    series: [],

    chart: {
      type: 'donut',
      height: 220
    },

    labels: [],

    legend: {
      position: 'bottom'
    },

    responsive: []

  };
    //====================================================
  // Constructor
  //====================================================

  constructor(private heroService: HeroService) {

    this.initializeTrendChart();

    this.initializeDonutChart();

  }

  ngOnInit(): void {
    debugger;
    this.heroService.ajax(
       'GetAllUsers ',
      'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
      {}
    ).then((resp:any) => {
      console.log('resp=>', resp);
      let dt = this.heroService.xmltojson(resp,'quick_links');
      console.log('show response after xmltojson=>',dt);
      
    })
  }

 

  //====================================================
  // Trend Chart
  //====================================================

  initializeTrendChart(): void {

    this.trendChart = {

      series: [

        {
          name: 'Recognition Points',
          data: [420, 560, 690, 780, 910, 1248]
        }

      ],

      chart: {

        type: 'line',

        height: 220,

        toolbar: {

          show: false

        },

        zoom: {

          enabled: false

        }

      },

      stroke: {

        curve: 'smooth',

        width: 4

      },

      dataLabels: {

        enabled: false

      },

      grid: {

        borderColor: '#ECEFF5',

        strokeDashArray: 4

      },

      xaxis: {

        categories: [

          'Feb',

          'Mar',

          'Apr',

          'May',

          'Jun',

          'Jul'

        ]

      },

      tooltip: {

        enabled: true

      }

    };

  }

  //====================================================
  // Donut Chart
  //====================================================

  initializeDonutChart(): void {

    this.donutChart = {

      series: [

        35,

        25,

        20,

        12,

        8

      ],

      chart: {

        type: 'donut',

        height: 220

      },

      labels: [

        'Leadership',

        'Innovation',

        'Customer Focus',

        'Mentorship',

        'Teamwork'

      ],

      legend: {

        position: 'bottom',

        horizontalAlign: 'center',

        fontSize: '13px'

      },

      responsive: [

        {

          breakpoint: 768,

          options: {

            chart: {

              width: 300

            },

            legend: {

              position: 'bottom'

            }

          }

        }

      ]

    };

  }

  //====================================================
  // Helper Methods
  //====================================================

  createRecognition(): void {

    console.log('Create Recognition clicked');

  }

  viewAllRequests(): void {

    console.log('View All Requests clicked');

  }

  refreshDashboard(): void {

    this.initializeTrendChart();

    this.initializeDonutChart();

  }

}