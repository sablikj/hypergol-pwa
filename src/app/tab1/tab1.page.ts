import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.model';
import { LaunchApiService } from '../services/launch-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  launches: Launch[] = [];
  launches$: Observable<Launch[]>;

  constructor(private apiService: LaunchApiService) {
    this.launches$ = this.apiService.getUpcomingLaunches$();
    this.apiService.getUpcomingLaunches$().subscribe(data => {
      this.launches = data;
    })
  }
}
