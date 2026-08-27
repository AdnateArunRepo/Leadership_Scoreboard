import { Component,OnInit } from '@angular/core';
import { HeroService } from '../../core/services/hero.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';




@Component({
  selector: 'app-recognization-request',
  standalone: true,
  imports: [MatSelectModule, CommonModule, MatCardModule,MatIconModule,MatButtonModule,MatPaginatorModule],
  templateUrl: './recognization-request.component.html',
  styleUrl: './recognization-request.component.scss'
})
export class RecognizationRequestComponent implements OnInit {

   recognitionRequests: any[] = [];
   loggedInUser:any;
   username:any;
   period:any=localStorage.getItem('Period') || '';
   status:any= localStorage.getItem('status') || '';

  paginatedRequests: any[] = [];

currentPage = 0;
pageSize = 5;

  constructor(
    private heroService: HeroService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
  }

 

   getUserDetails(): void {
    
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
        this.getRecognitionRequests('');
      
      })
      .catch((error: any) => {
        console.error('getUserDetails error:', error);
      });
  }

   getRecognitionRequests(period: string): void {
    console.log('New Component recognition requests:', period);
    debugger

    this.heroService
      .ajax(
        'GetRecognitionDataFilter',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        {
          period: this.period,
          username: this.loggedInUser,
          status: this.status
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

               // Reset pagination
      this.currentPage = 0;
      this.pageSize = 5;

      // Display first 10
      this.updatePagination();

      //  this.getTop5RecognitionData(period);

        // Reset pagination whenever new data is loaded

        // this.recognitionPageIndex = 0;

        // this.paginatedRecognitionRequests = this.recognitionRequests.slice(
        //   0,
        //   this.recognitionPageSize,
        // );
      })
      .catch((error: any) => {
        console.error('recognitionRequests error:', error);

        this.recognitionRequests = [];
         this.paginatedRequests = [];

      });
  }

  goBack(): void {
  this.router.navigate(['/recognization-request']);
}

//=================================pagination==================================
updatePagination(): void {

  const startIndex = this.currentPage * this.pageSize;
  const endIndex = startIndex + this.pageSize;

  console.log('Total records:', this.recognitionRequests.length);
  console.log('Current page:', this.currentPage);
  console.log('Start:', startIndex);
  console.log('End:', endIndex);

  this.paginatedRequests = this.recognitionRequests.slice(
    startIndex,
    endIndex
  );

  console.log('Displayed records:', this.paginatedRequests);
}

onPageChange(event: any): void {

  console.log('Paginator event:', event);

  this.currentPage = event.pageIndex;
  this.pageSize = event.pageSize;

  this.updatePagination();
}



}
