import { OnInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroService } from '../../core/services/hero.service';
import { MatSelectModule } from '@angular/material/select';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

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
  ApexNonAxisChartSeries,
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
    MatProgressBarModule,
    MatSelectModule,
    MatPaginatorModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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

  getInitials(name: string): string {
    if (!name) {
      return '';
    }

    return name
      .split(' ')
      .map((n) => n.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }

  leaders = [
    {
      initial: 'RM',
      name: 'Rahul Mehta',
      designation: 'Team Leader',
      department: 'Engineering',
      points: 980,
    },

    {
      initial: 'AK',
      name: 'Abhineet Kumar',
      designation: 'Senior Developer',
      department: 'Engineering',
      points: 925,
    },

    {
      initial: 'PS',
      name: 'Priya Sharma',
      designation: 'Project Manager',
      department: 'Delivery',
      points: 880,
    },

    {
      initial: 'RJ',
      name: 'Rohan Joshi',
      designation: 'QA Lead',
      department: 'Testing',
      points: 815,
    },

    {
      initial: 'NS',
      name: 'Neha Singh',
      designation: 'HR Manager',
      department: 'Human Resource',
      points: 790,
    },
  ];

  //====================================================
  // Recent Requests
  //====================================================

  requests = [
    {
      employee: 'Rahul Mehta',
      category: 'Leadership',
      points: 50,
      status: 'Approved',
    },

    {
      employee: 'Abhineet Kumar',
      category: 'Innovation',
      points: 40,
      status: 'Pending',
    },

    {
      employee: 'Priya Sharma',
      category: 'Customer Focus',
      points: 30,
      status: 'Approved',
    },

    {
      employee: 'Neha Singh',
      category: 'Mentorship',
      points: 20,
      status: 'Rejected',
    },
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
        show: false,
      },
    },

    xaxis: {
      categories: [],
    },

    stroke: {
      curve: 'smooth',
      width: 4,
    },

    dataLabels: {
      enabled: false,
    },

    grid: {},

    tooltip: {},
  };

  donutChart: DonutChartOptions = {
    series: [],

    chart: {
      type: 'donut',
      height: 220,
    },

    labels: [],

    legend: {
      position: 'bottom',
    },

    responsive: [],
  };
  //====================================================
  // Constructor
  //====================================================

  constructor(private heroService: HeroService, private router: Router) {
    // this.initializeTrendChart();

    this.initializeDonutChart();
  }

  // username: any = localStorage.getItem('username') || 'Guest';
  username:any;
  dn:any;
  sort:any;

  ngOnInit(): void {
    debugger;
   
    // this.heroService
    //   .ajax(
    //     'GetUserDetails',
    //     'http://schemas.cordys.com/1.1/ldap',
    //     {
    //       sort: this.sort || '',
    //       dn: this.dn || '',
    //     },
    //   )
    //   .then((resp: any) => {
    //     console.log('GetloggedInUserDetails resp=>', resp);
    //     let dt = this.heroService.xmltojson(resp, 'user');
    //     console.log('show GetloggedInUserDetails after xmltojson=>', dt);
    //   });


    // this.getTop5RecognitionData('');
    //this.loadDashboardData();
    this.getUserDetails();
    
   // this.getRecognitionReqCount('');
  }

  //====================================================
  // Trend Chart
  //====================================================

  // initializeTrendChart(): void {
  //   this.trendChart = {
  //     series: [
  //       {
  //         name: 'Recognition Points',
  //         data: [420, 560, 690, 780, 910, 1248],
  //       },
  //     ],

  //     chart: {
  //       type: 'line',

  //       height: 220,

  //       toolbar: {
  //         show: false,
  //       },

  //       zoom: {
  //         enabled: false,
  //       },
  //     },

  //     stroke: {
  //       curve: 'smooth',

  //       width: 4,
  //     },

  //     dataLabels: {
  //       enabled: false,
  //     },

  //     grid: {
  //       borderColor: '#ECEFF5',

  //       strokeDashArray: 4,
  //     },

  //     xaxis: {
  //       categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
  //     },

  //     tooltip: {
  //       enabled: true,
  //     },
  //   };
  // }

  //====================================================
  // Donut Chart
  //====================================================

//   ngOnInit(): void {
//   console.log('🔥🔥 DASHBOARD INIT');
//   this.getLast5Years();
// }

// ngOnDestroy(): void {
//   console.log('🔥🔥 DASHBOARD DESTROY');
// }


  initializeDonutChart(): void {
    this.donutChart = {
      series: [],

      chart: {
        type: 'donut',

        height: 220,
      },

      labels: [
       
      ],

      legend: {
        position: 'bottom',

        horizontalAlign: 'center',

        fontSize: '13px',
      },

      responsive: [
        {
          breakpoint: 768,

          options: {
            chart: {
              width: 300,
            },

            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }

  //====================================================
  // Helper Methods fro chart
  //====================================================

    hasCategoryData: boolean = false;


populateDonutChart(): void {

  // No API response
  if (
    !Array.isArray(this.recognitionCategoryPercentage) ||
    this.recognitionCategoryPercentage.length === 0
  ) {
    this.hasCategoryData = false;

    this.donutChart.series = [];
    this.donutChart.labels = [];

    return;
  }

  // -----------------------------
  // Category names
  // -----------------------------
  this.donutChart.labels =
    this.recognitionCategoryPercentage.map(
      (item: any) => item.CATEGORYNAME || 'Unknown'
    );

  // -----------------------------
  // Percentage values
  // -----------------------------
  this.donutChart.series =
    this.recognitionCategoryPercentage.map(
      (item: any) => Number(item.REQUESTPERCENTAGE) || 0
    );

  // -----------------------------
  // Check if at least one
  // percentage is greater than 0
  // -----------------------------
  this.hasCategoryData =
    this.recognitionCategoryPercentage.some(
      (item: any) =>
        Number(item.REQUESTPERCENTAGE) > 0
    );

  console.log(
    'Category Labels:',
    this.donutChart.labels
  );

  console.log(
    'Category Percentages:',
    this.donutChart.series
  );

  console.log(
    'Has Category Data:',
    this.hasCategoryData
  );
}


  viewAllRequests(): void {
    console.log('View All Requests clicked');
  }

  refreshDashboard(): void {
  //  this.initializeTrendChart();

    this.initializeDonutChart();
  }

  //==================calling services for fetching data from recognition table======================

  recognitionDataMonthly: any = [];
  recognitionDataQuarterly: any = [];
  recognitionData: any[] = [];

  recognitionRequests: any[] = [];
  top5Data: any[] = [];
  RecognitionReqCount: any = {};
  loggedInUser: any;
  recognitionCategoryPercentage:any =[];
  recognitionBadgeCount:any = [];

  getRecognitionDataMonthly(): void {
    this.heroService
      .ajax(
        'GetRecognitionDataMonthly ',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {},
      )
      .then((resp: any) => {
        console.log('getRecognitionDataMonthlyResp=>', resp);
        const result = this.heroService.xmltojson(
          resp,
          'O12ADNATELEADERSHIP_SCOREBOARDRECOGNITION',
        );
        console.log('RESULT:', result);
        console.log('IS ARRAY:', Array.isArray(result));

        this.recognitionDataMonthly = Array.isArray(result) ? result : [result];

        // IMPORTANT
        this.recognitionData = this.recognitionDataMonthly;

        console.log('Monthly Dashboard Data:', this.recognitionData);

        //   if (Array.isArray(result)) {
        //   this.recognitionDataMonthly = result;
        // } else if (result) {
        //   this.recognitionDataMonthly = [result];
        // } else {
        //   this.recognitionDataMonthly = [];
        // }
      })
      .catch((error: any) => {
        console.error('Monthly API Error:', error);
      });
  }

  getRecognitionDataQuarterly(): void {
    this.heroService
      .ajax(
        'GetRecognitionDataQuarterly ',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {},
      )
      .then((resp: any) => {
        console.log('getRecognitionDataQuarterlyResp=>', resp);
        const result = this.heroService.xmltojson(
          resp,
          'O12ADNATELEADERSHIP_SCOREBOARDRECOGNITION',
        );

        this.recognitionDataQuarterly = Array.isArray(result)
          ? result
          : [result];
        console.log('recognitionDataQuarterly:', this.recognitionDataQuarterly);
        // IMPORTANT
        this.recognitionData = this.recognitionDataQuarterly;

        console.log('Quarterly Dashboard Data:', this.recognitionData);
      })
      .catch((error: any) => {
        console.error('Quarterly API Error:', error);
      });
  }

  getTop5RecognitionData(period: string): void {
     console.log('Loading recent recognition requests for:', period);
     localStorage.setItem('Period',period)
   
    this.heroService
      .ajax(
        'GetTop5OnLeaderboard',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {
          period: period,
        },
      )
      .then((resp: any) => {
        console.log('Top 5 response:', resp);

        const result = this.heroService.xmltojson(
          resp,
          'TABLE'
       //   'O12ADNATELEADERSHIP_SCOREBOARDRECOGNITION',
        );

        console.log('Top 5 result:', result);

        this.top5Data = Array.isArray(result) ? result : result ? [result] : [];

        this.top5PageIndex = 0;

        this.paginatedTop5Data = this.top5Data.slice(0, this.top5PageSize);
      })
      .catch((error: any) => {
        console.error('Error getting top 5 recognition data:', error);

        this.top5Data = [];
      });
  }

  getRecentRecognitionRequest(period: string): void {
    console.log('Loading recent recognition requests for:', period);

    this.heroService
      .ajax(
        'GetRecognitionDataFilter',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {
          period: period,
          username: this.loggedInUser,
        },
      )
      .then((resp: any) => {
        console.log('getRecentRecognitionRequest response:', resp);

        const result = this.heroService.xmltojson(
          resp,
          'O12ADNATELEADERSHIP_SCOREBOARDRECOGNITION',
        );

        console.log('getRecentRecognitionRequest result:', result);

        this.recognitionRequests = Array.isArray(result)
          ? result
          : result
            ? [result]
            : [];

        console.log('Recognition Requests:', this.recognitionRequests);

      //  this.getTop5RecognitionData(period);

        // Reset pagination whenever new data is loaded

        this.recognitionPageIndex = 0;

        this.paginatedRecognitionRequests = this.recognitionRequests.slice(
          0,
          this.recognitionPageSize,
        );
      })
      .catch((error: any) => {
        console.error('recognitionRequests error:', error);

        this.recognitionRequests = [];
      });
  }

  getUserDetails(): void {
    debugger;
    this.heroService
      .ajax(
        'GetUserDetails',
        'http://schemas.cordys.com/UserManagement/1.0/Organization',
        {
          Username: this.username || '',
        },
      )
      .then((resp: any) => {
        console.log('getUserDetails response:', resp);
        this.loggedInUser = resp.User.UserName;
        console.log('loggedInUser', this.loggedInUser);

        const result = this.heroService.xmltojson(resp, 'User');

        console.log('getUserDetails result:', result);
        this.getLast5Years();
      })
      .catch((error: any) => {
        console.error('getUserDetails error:', error);
      });
  }

  getRecognitionReqCount(period: string): void {
    console.log('Loading recent recognition requests for:', period);

    this.heroService
      .ajax(
        'GetRecognitionReqCount',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {
          period: period,
          username: this.loggedInUser,
        },
      )
      .then((resp: any) => {
        console.log('GetRecognitionReqCount response:', resp);

        this.RecognitionReqCount = this.heroService.xmltojson(
          resp,
          'O12ADNATELEADERSHIP_SCOREBOARDRECOGNITION',
        );

        console.log('GetRecognitionReqCount result:', this.RecognitionReqCount);

        // this.RecognitionReqCount = Array.isArray(result)
        //   ? result
        //   : result
        //     ? [result]
        //     : [];

        // console.log(
        //   'Recognition Requests Count:',
        //   this.RecognitionReqCount
        // );
      })
      .catch((error: any) => {
        console.error('GetRecognitionReqCount error:', error);

        this.RecognitionReqCount = [];
      });
  }


  getRecognitionCategoryPercentage(period: string): void {
   
    this.heroService
      .ajax(
        'GetRecognitionCategoryPercentage',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {
          period: period,
          username: this.loggedInUser,
        },
      )
      .then((resp: any) => {
        console.log('GetRecognitionCategoryPercentage  response:', resp);

        const result = this.heroService.xmltojson(
          resp,
          'O12ADNATELEADERSHIP_SCOREBOARDRECOGNITION',
        );

        console.log('GetRecognitionCategoryPercentage result:', result);

        this.recognitionCategoryPercentage = Array.isArray(result)
          ? result
          : result
            ? [result]
            : [];

        console.log('Recognition Category Percentages:', this.recognitionCategoryPercentage);
        // Reset pagination whenever new data is loaded

        // Update the donut chart with the new data
        this.populateDonutChart();
        this.populatePerformanceData();

     
      })
      .catch((error: any) => {
        console.error('GetRecognitionCategoryPercentage error:', error);

        this.recognitionCategoryPercentage = [];
      });
  }

  GetRecognitionBadgeCount(period: string): void {

    this.heroService
      .ajax(
        'GetRecognitionBadgeCount',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {
          period: period,
          username: this.loggedInUser,
        },
      )
      .then((resp: any) => {
        console.log('GetRecognitionBadgeCount response:', resp);

        const result = this.heroService.xmltojson(
          resp,
          'recognition_badge_table',
        );

        console.log('GetRecognitionBadgeCount result:', result);

        this.recognitionBadgeCount = Array.isArray(result)
          ? result
          : result
            ? [result]
            : [];

        console.log('Recognition Badge Counts:', this.recognitionBadgeCount);

      })
      .catch((error: any) => {
        console.error('GetRecognitionBadgeCount error:', error);

        this.recognitionBadgeCount = [];
      });

  }

  

  //==================toggle month,Quarter,Year======================

  // selectedPeriod: string = 'monthly';

  // onPeriodChange(period: string): void {
  //   this.selectedPeriod = period;

  //   switch (period) {
  //     case 'monthly':
  //       this.loadMonthlyData();
  //       break;

  //     case 'quarterly':
  //       this.loadQuarterlyData();
  //       break;

  //     case 'annual':
  //       this.loadAnnualData();
  //       break;
  //   }
  // }

  // loadMonthlyData(): void {
  //   this.getRecognitionDataMonthly();
  // }

  // loadQuarterlyData(): void {
  //   this.getRecognitionDataQuarterly();
  // }

  // loadAnnualData(): void {

  // }

  //=======================filter year,month,quarter========================

  selectedPeriodType: 'monthly' | 'quarterly' | 'annual' = 'monthly';

  selectedMonth: number = new Date().getMonth() + 1;

  selectedQuarter: number = Math.floor(new Date().getMonth() / 3) + 1;

  selectedYear: number = new Date().getFullYear();

  //------------------------------------------
  getSelectedPeriod(): string {
    if (this.selectedPeriodType === 'monthly') {
      return `M${this.selectedMonth}-${this.selectedYear}`;
    }

    if (this.selectedPeriodType === 'quarterly') {
      return `Q${this.selectedQuarter}-${this.selectedYear}`;
    }

    return `Y${this.selectedYear}`;
  }

  //------------------------------------------
  loadDashboardData(): void {
    const period = this.getSelectedPeriod();

    console.log('Loading leaderboard for:', period);

    //Top 5 leaderboard data
    this.getTop5RecognitionData(period);
    // Recent recognition requests
    this.getRecentRecognitionRequest(period);
    // Recognition request count
    this.getRecognitionReqCount(period);
    // Recognition category percentage
    this.getRecognitionCategoryPercentage(period);
    // Recognition badge count
    this.GetRecognitionBadgeCount(period);
  }
  //------------------------------------------

  months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];
  //------------------------------------------
  quarters = [
    {
      value: 1,
      label: 'Q1 - January to March',
    },
    {
      value: 2,
      label: 'Q2 - April to June',
    },
    {
      value: 3,
      label: 'Q3 - July to September',
    },
    {
      value: 4,
      label: 'Q4 - October to December',
    },
  ];
  //------------------------------------------
  years: number[] = [];

  getLast5Years(): void {
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year > currentYear - 5; year--) {
      this.years.push(year);
      console.log('Year added:', year);
    }

    this.loadDashboardData();
  }

  //------------------------------------------
  onPeriodTypeChange(type: 'monthly' | 'quarterly' | 'annual'): void {
    this.selectedPeriodType = type;

    this.loadDashboardData();
  }
  //------------------------------------------
  onPeriodChange(): void {
    const period = this.getSelectedPeriod();

    console.log('Selected period:', period);

    this.loadDashboardData();
  }
  //-----------------------Recent Recognition Req Paginator & top 5 Leaderboard  -------------------
  //recognitionRequests: any[] = [];

  paginatedRecognitionRequests: any[] = [];

  recognitionPageSize = 5;

  recognitionPageIndex = 0;

  onRecognitionPageChange(event: PageEvent): void {
    this.recognitionPageIndex = event.pageIndex;
    this.recognitionPageSize = event.pageSize;

    const startIndex = this.recognitionPageIndex * this.recognitionPageSize;

    const endIndex = startIndex + this.recognitionPageSize;

    this.paginatedRecognitionRequests = this.recognitionRequests.slice(
      startIndex,
      endIndex,
    );
  }

  //---------------------------------top % Leaderboard Paginator-------------------

  // top5Data: any[] = [];

  paginatedTop5Data: any[] = [];

  top5PageSize = 5;

  top5PageIndex = 0;

  onTop5PageChange(event: PageEvent): void {
    this.top5PageIndex = event.pageIndex;

    this.top5PageSize = event.pageSize;

    const startIndex = this.top5PageIndex * this.top5PageSize;

    const endIndex = startIndex + this.top5PageSize;

    this.paginatedTop5Data = this.top5Data.slice(startIndex, endIndex);
  }
//=============================My performance=========================

performanceData: any[] = [];
populatePerformanceData(): void {

  if (
    !Array.isArray(this.recognitionCategoryPercentage) ||
    this.recognitionCategoryPercentage.length === 0
  ) {
    this.performanceData = [];
    return;
  }

  this.performanceData =
    this.recognitionCategoryPercentage.map((item: any) => ({
      category: item.CATEGORYNAME || 'Unknown',
      percentage: Number(item.TOTALAWARDEDPOINTS) || 0
    }));

  console.log('Performance Data:', this.performanceData);
}

//=============================Navigation to My Inbox=========================
goToMyInbox(): void {
  this.router.navigate(['/my-inbox']);
}
//============================badge count=====================================
getBadgeCount(category: string): number {
  const badge = this.recognitionBadgeCount.find(
    (item: any) => item.category === category
  );

  return badge ? Number(badge.badgecount) : 0;
}

//=============================Navigation to Recognition Request=========================
goToRequestComponent(): void {
   localStorage.setItem('status','');
  this.router.navigate(['/request']);
 
}

goToRequestComponentPending(): void {
   localStorage.setItem('status','Pending');
  this.router.navigate(['/request']);
 
}

goToRequestComponentComplete(): void {
   localStorage.setItem('status','Complete');
  this.router.navigate(['/request']);
 
}

}
