import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexStroke,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexMarkers,
  ApexGrid,
  ApexTooltip,
  ApexPlotOptions,
  ApexFill
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  colors: string[];
};

@Component({
  selector: 'app-leader-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgApexchartsModule
  ],
  templateUrl: './leader-dashboard.component.html',
  styleUrls: ['./leader-dashboard.component.scss']
})
export class LeaderDashboardComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {

    this.loadQuarterlyChart();

    this.loadYearlyChart();

  }

  //=========================================
  // Logged In User
  //=========================================

  user = {

    employeeId: 'EMP1001',

    employeeName: 'Abhineet Kumar',

    designation: 'Software Engineer',

    department: 'Application Development',

    image: 'assets/images/profile.png'

  };

  //=========================================
  // Dashboard Summary
  //=========================================

  dashboardSummary = {

    totalPoints: 325,

    currentRank: 8,

    requestsRaised: 18,

    badgesEarned: 6

  };

  //=========================================
  // Monthly Leaderboard
  //=========================================

  monthlyLeaderboard = [

    {
      rank: 1,
      employee: 'Rahul Sharma',
      designation: 'Technical Lead',
      points: 285
    },

    {
      rank: 2,
      employee: 'Priya Singh',
      designation: 'Senior Software Engineer',
      points: 260
    },

    {
      rank: 3,
      employee: 'Ankit Verma',
      designation: 'Software Engineer',
      points: 242
    },

    {
      rank: 4,
      employee: 'Neha Kapoor',
      designation: 'Business Analyst',
      points: 218
    },

    {
      rank: 5,
      employee: 'Abhineet Kumar',
      designation: 'Software Engineer',
      points: 205
    }

  ];

  //=========================================
  // Recognition Requests
  //=========================================

  recognitionRequests = [

    {

      requestId: 'REQ001',

      category: 'Technical Excellence',

      subCategory: 'Knowledge Sharing',

      points: 10,

      status: 'Approved',

      submittedOn: '10-Jul-2026'

    },

    {

      requestId: 'REQ002',

      category: 'Innovation',

      subCategory: 'AI Workshop',

      points: 20,

      status: 'Pending',

      submittedOn: '18-Jul-2026'

    },

    {

      requestId: 'REQ003',

      category: 'Business Impact',

      subCategory: 'Automation',

      points: 15,

      status: 'Approved',

      submittedOn: '24-Jul-2026'

    }

  ];

  //=========================================
  // Badges
  //=========================================

  badges = [

    {
      title: 'Knowledge Guru',
      icon: 'school'
    },

    {
      title: 'Innovation Champion',
      icon: 'emoji_objects'
    },

    {
      title: 'AI Ambassador',
      icon: 'smart_toy'
    },

    {
      title: 'Leadership Champion',
      icon: 'workspace_premium'
    },

    {
      title: 'Culture Champion',
      icon: 'favorite'
    },

    {
      title: 'Collaboration Star',
      icon: 'groups'
    }

  ];

  //=========================================
  // Notifications
  //=========================================

  notifications = [

    {

      title: 'Recognition Approved',

      description:
        'Your Knowledge Sharing request has been approved.',

      date: 'Today'

    },

    {

      title: 'Badge Earned',

      description:
        'Congratulations! You earned Innovation Champion Badge.',

      date: 'Yesterday'

    },

    {

      title: 'Leaderboard Updated',

      description:
        'Monthly Leaderboard has been refreshed.',

      date: '2 Days Ago'

    }

  ];

  //=========================================
  // Apex Chart Variables
  //=========================================

  public quarterlyChartOptions!: ChartOptions;

  public yearlyChartOptions!: ChartOptions;

    //=========================================
  // Quarterly Chart
  //=========================================

  loadQuarterlyChart(): void {

    this.quarterlyChartOptions = {

      series: [
        {
          name: 'Recognition Points',
          data: [45, 72, 98, 130]
        }
      ],

      chart: {
        type: 'line',
        height: 320,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },

      colors: ['#1565C0'],

      stroke: {
        curve: 'smooth',
        width: 4
      },

      dataLabels: {
        enabled: false
      },

      markers: {
        size: 6
      },

      xaxis: {
        categories: ['Q1', 'Q2', 'Q3', 'Q4']
      },

      grid: {
        borderColor: '#ECECEC'
      },

      title: {
        text: 'Quarterly Recognition Trend',
        align: 'left'
      },

      tooltip: {
        enabled: true
      },

      plotOptions: {},

      fill: {
        opacity: 1
      }

    };

  }

  //=========================================
  // Yearly Chart
  //=========================================

  loadYearlyChart(): void {

    this.yearlyChartOptions = {

      series: [
        {
          name: 'Recognition Points',
          data: [110, 165, 225, 295, 365]
        }
      ],

      chart: {
        type: 'bar',
        height: 320,
        toolbar: {
          show: false
        }
      },

      colors: ['#43A047'],

      stroke: {
        width: 2
      },

      dataLabels: {
        enabled: false
      },

      markers: {
        size: 0
      },

      xaxis: {
        categories: [
          '2022',
          '2023',
          '2024',
          '2025',
          '2026'
        ]
      },

      grid: {
        borderColor: '#ECECEC'
      },

      title: {
        text: 'Yearly Recognition Trend',
        align: 'left'
      },

      tooltip: {
        enabled: true
      },

      plotOptions: {
        bar: {
          borderRadius: 6,
          columnWidth: '45%'
        }
      },

      fill: {
        opacity: 1
      }

    };

  }

  //=========================================
  // Dashboard Actions
  //=========================================

  createRecognition(): void {

    console.log('Create Recognition');

  }

  viewLeaderboard(): void {

    console.log('View Leaderboard');

  }

  openNotifications(): void {

    console.log('Open Notifications');

  }

  refreshDashboard(): void {

    this.loadQuarterlyChart();

    this.loadYearlyChart();

  }

  logout(): void {

    console.log('Logout');

  }

  //=========================================
  // Helper Methods
  //=========================================

  getStatusColor(status: string): string {

    switch (status) {

      case 'Approved':
        return '#4CAF50';

      case 'Pending':
        return '#FB8C00';

      case 'Rejected':
        return '#F44336';

      default:
        return '#9E9E9E';

    }

  }

  getRankIcon(rank: number): string {

    switch (rank) {

      case 1:
        return '🥇';

      case 2:
        return '🥈';

      case 3:
        return '🥉';

      default:
        return rank.toString();

    }

  }

}