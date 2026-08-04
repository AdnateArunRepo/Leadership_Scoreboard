// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-dashboard',
//   standalone: true,
//   imports: [],
//   templateUrl: './admin-dashboard.component.html',
//   styleUrl: './admin-dashboard.component.scss'
// })
// export class AdminDashboardComponent {

// }





import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

// Apex Charts
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexXAxis,
  ApexDataLabels,
  ApexStroke,
  ApexLegend,
  NgApexchartsModule
} from 'ng-apexcharts';

export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  responsive: ApexResponsive[];
  legend: ApexLegend;
};

export type BarChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
};

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    NgApexchartsModule
  ]
})
export class AdminDashboardComponent {

  // ========================================
  // KPI SUMMARY
  // ========================================

  dashboard = {
    totalCategories: 5,
    totalSubCategories: 24,
    pendingApprovals: 18,
    activeUsers: 152
  };

  // ========================================
  // TABLE COLUMNS
  // ========================================

  displayedColumns: string[] = [
    'employee',
    'category',
    'points',
    'status',
    'date',
    'action'
  ];

  approvalColumns: string[] = [
    'employee',
    'workflow',
    'level',
    'days',
    'review'
  ];

  // ========================================
  // RECENT REQUESTS
  // ========================================

  recentRequests = [
    {
      employee: 'Rahul Sharma',
      category: 'Technical Excellence',
      points: 15,
      status: 'Approved',
      date: '10 Jul 2026'
    },
    {
      employee: 'Priya Singh',
      category: 'Innovation',
      points: 20,
      status: 'Pending',
      date: '09 Jul 2026'
    },
    {
      employee: 'Amit Kumar',
      category: 'Business Impact',
      points: 15,
      status: 'Rejected',
      date: '08 Jul 2026'
    },
    {
      employee: 'Sneha Patel',
      category: 'Culture',
      points: 10,
      status: 'Approved',
      date: '07 Jul 2026'
    }
  ];

  // ========================================
  // PENDING APPROVALS
  // ========================================

  pendingApprovals = [
    {
      employee: 'Rohit Verma',
      workflow: 'Technical Excellence',
      level: 'Manager',
      days: 2
    },
    {
      employee: 'Anjali Shah',
      workflow: 'Innovation',
      level: 'HR',
      days: 4
    },
    {
      employee: 'Deepak Gupta',
      workflow: 'Business Impact',
      level: 'Director',
      days: 1
    }
  ];

  // ========================================
  // PIE CHART
  // ========================================

  pieSeries: ApexNonAxisChartSeries = [
    40,
    20,
    15,
    15,
    10
  ];

  pieLabels: string[] = [
    'Technical',
    'Innovation',
    'Leadership',
    'Culture',
    'Business'
  ];

  pieChart: ApexChart = {
    type: 'pie',
    height: 320
  };

  responsive: ApexResponsive[] = [
    {
      breakpoint: 768,
      options: {
        chart: {
          width: 280
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ];

  legend: ApexLegend = {
    position: 'bottom'
  };

  // ========================================
  // BAR CHART
  // ========================================

  barSeries: ApexAxisChartSeries = [
    {
      name: 'Recognition Requests',
      data: [18, 22, 26, 30, 24, 38]
    }
  ];

  barChart: ApexChart = {
    type: 'bar',
    height: 320,
    toolbar: {
      show: false
    }
  };

  xAxis: ApexXAxis = {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun'
    ]
  };

  dataLabels: ApexDataLabels = {
    enabled: false
  };

  stroke: ApexStroke = {
    show: true,
    width: 2
  };

  // ========================================
  // ACTIONS
  // ========================================

  createCategory(): void {
    console.log('Create Category');
  }

  createSubCategory(): void {
    console.log('Create Sub Category');
  }

  configureWorkflow(): void {
    console.log('Workflow');
  }

  exportReport(): void {
    console.log('Export');
  }

  viewRequest(request: any): void {
    console.log(request);
  }

  reviewApproval(request: any): void {
    console.log(request);
  }

}