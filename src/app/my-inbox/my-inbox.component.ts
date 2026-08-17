import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../core/services/hero.service';
import { ActivatedRoute } from '@angular/router';

interface InboxTask {
 requestId: string;
  assignedOn: string;
  subject: string;
  status: 'Pending' | 'Completed';
}

@Component({
  selector: 'app-my-inbox',
  standalone: true,
imports: [CommonModule, FormsModule],
  templateUrl: './my-inbox.component.html',
  styleUrl: './my-inbox.component.scss'
})
export class MyInboxComponent {
  
  constructor(private hs: HeroService, private route: ActivatedRoute) {}
userParam: any;

 ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
   //  this.userParam = params['user']
this.userParam = '';
       // ? decodeURIComponent(params['user'])
       // : null;
      this.getUserTasks();
      console.log('Extracted Parameter:', this.userParam);
    });
  }
   activeTab: 'pending' | 'completed' = 'pending';
  searchTerm = '';

  


  


getUserTasks() {
    this.hs
      .ajax(
        'GetUserTasks',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        { UserID: this.userParam }
      )
      .then((resp: any) => {
        console.log('GetUserTasks response =>', resp);

        const tuples = resp?.tuple;
        if (!tuples) {
          this.pendingTasks = [];
          return;
        }

        // Normalize: tuple can be a single object or an array
        const tupleArray = Array.isArray(tuples) ? tuples : [tuples];

        this.pendingTasks = tupleArray.map((t: any) => {
          const util = t?.old?.LeadershipUtility ?? {};
          return {
            requestId: util.REQUESTID ?? '',
            assignedOn: util.ASSIGNEDON ?? '',
            subject: util.SUBJECT ?? '',
            status: 'Pending'
          };
        });
      })
      .catch((err: any) => {
        console.error('GetUserTasks error =>', err);
      });
  }
 pendingTasks: InboxTask[] = [];
  completedTasks: InboxTask[] = [];

  get currentTasks(): InboxTask[] {
    const source = this.activeTab === 'pending' ? this.pendingTasks : this.completedTasks;
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return source;
    return source.filter(
      t =>
        t.subject.toLowerCase().includes(term) ||
        t.requestId.toLowerCase().includes(term)
    );
  }
  switchTab(tab: 'pending' | 'completed'): void {
    this.activeTab = tab;
    this.searchTerm = '';
  }

  openTask(task: InboxTask): void {
    console.log('Open Task clicked:', task);
  }
}
