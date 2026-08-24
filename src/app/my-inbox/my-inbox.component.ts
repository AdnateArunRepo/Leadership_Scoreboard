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
  taskUrl: string;
}

@Component({
  selector: 'app-my-inbox',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-inbox.component.html',
  styleUrl: './my-inbox.component.scss'
})
export class MyInboxComponent {

  username: any = localStorage.getItem('username') || 'Guest';
  loggedInUser: any;
  activeTab: 'pending' | 'completed' = 'pending';
  searchTerm = '';
  pendingTasks: InboxTask[] = [];
  completedTasks: InboxTask[] = [];
  sortColumn: keyof InboxTask | '' = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  constructor(private hs: HeroService, private route: ActivatedRoute) {
    //console.log('username field at construction =>', this.username)
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.getUserDetails(); 
    });
  }

  getUserDetails(): void {
    this.hs
      .ajax(
        'GetUserDetails',
        'http://schemas.cordys.com/UserManagement/1.0/Organization',
        {
          Username: this.username,
        },
      )
      .then((resp: any) => {
        console.log('getUserDetails response:', resp);
        this.loggedInUser = resp.User.UserName;
        console.log('loggedInUser', this.loggedInUser);

        this.getUserTasks();
      })
      .catch((error: any) => {
        console.error('getUserDetails error:', error);
      });
  }

  getUserTasks() {
    this.hs
      .ajax(
        'GetUserTasks',
        'http://schemas.cordys.com/LDR_SCRBD_WsAppPackage',
        { UserID: this.loggedInUser }
      )
      .then((resp: any) => {
        console.log('GetUserTasks response =>', resp);

             const tuples = resp?.tuple;
        if (!tuples) {
          this.pendingTasks = [];
          this.completedTasks = [];
          return;
        }

        const tupleArray = Array.isArray(tuples) ? tuples : [tuples];

       


                const allTasks: (InboxTask & { state: string })[] = tupleArray.map((t: any) => {
          const util = t?.old?.LeadershipUtility ?? {};
          const state = String(util.STATE ?? '');

          return {
            requestId: util.REQUESTID ?? '',
            assignedOn: util.ASSIGNEDON ?? '',
            subject: util.SUBJECT ?? '',
            status: state === '5' ? 'Completed' : 'Pending',
            taskUrl: util.TASKURL ?? '',
            state
          };
        });
                this.pendingTasks = allTasks.filter(t => t.state === '2');
        this.completedTasks = allTasks.filter(t => t.state === '5');
      })

      .catch((err: any) => {
        console.error('GetUserTasks error =>', err);
      });
  }

  get currentTasks(): InboxTask[] {
  const source = this.activeTab === 'pending' ? this.pendingTasks : this.completedTasks;
  const term = this.searchTerm.trim().toLowerCase();

  
  let filtered = !term
    ? source
    : source.filter(
        t =>
          t.subject.toLowerCase().includes(term) ||
          t.requestId.toLowerCase().includes(term)
      );

  
  if (this.sortColumn) {
    const col = this.sortColumn;
    filtered = [...filtered].sort((a, b) => {
      const valA = (a[col] ?? '').toString().toLowerCase();
      const valB = (b[col] ?? '').toString().toLowerCase();

      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }

  return filtered;
}

  sortBy(column: keyof InboxTask): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'asc';
  }
    console.log('new state:', this.sortColumn, this.sortDirection);

}

  switchTab(tab: 'pending' | 'completed'): void {
    this.activeTab = tab;
    this.searchTerm = '';
  }

  openTask(task: InboxTask): void {
    console.log('Open Task clicked:', task);

    if (!task.taskUrl) {
      console.warn('No taskUrl found for this task, cannot open.');
      return;
    }
 
    window.open(task.taskUrl, '_blank');
  }
}