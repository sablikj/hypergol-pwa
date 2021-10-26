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
  launch_date: any;
  //firstLaunch: boolean;
  //index: number;

  constructor(private apiService: LaunchApiService) {
    this.launches$ = this.apiService.getUpcomingLaunches$();
    this.apiService.getUpcomingLaunches$().subscribe(data => {
      /*
      this.index = 0;
      for (let i = 0; i < data.length; i++) {
        var date = new Date(data[i].window_start).getTime();

        if (date < new Date().getTime()) {
          continue;
        } else {
          if (!this.firstLaunch) {
            this.launch_date = data[i].window_start;
          }
          this.launches[this.index] = data[i];
          this.index++;

          this.firstLaunch = true;
        }
      }*/

      this.launches = data;

      this.launch_date = data[0].window_start;
    })
  }

  demo: any;
  x = setInterval(() => {
    var now = new Date().getTime();
    var distance = new Date(this.launch_date).getTime() - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.demo = "T -   " + days + "  Days  " + hours + "  Hours  " + minutes + "  Minutes  " + seconds + "  Seconds";

    if (distance < 0 && distance > -10000) {
      clearInterval(this.x);
      this.demo = "Launching now!";
    }
    else if (distance < -10000) {
      clearInterval(this.x);
      this.demo = "Recently launched."
    }
  })
}