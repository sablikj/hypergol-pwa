import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Launch } from '../models/launch.model';
import { LaunchApiService } from '../services/launch-api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  launches: Launch[] = [];
  launches$: Observable<Launch[]>;
  upcomingLaunch: Launch;

  launch_date: any;
  showID: number;
  offset = 0;

  constructor(private apiService: LaunchApiService) {
    this.loadUpcomingLaunches(true, "");
  }

  loadUpcomingLaunches(isFirstLoad, event) {

    this.launches$ = this.apiService.getUpcomingLaunches$(this.offset);
    this.apiService.getUpcomingLaunches$(this.offset).subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        this.launches.push(data[i]);
      }
      // Setting new offset for next call
      this.offset += 10;

      if (isFirstLoad) {
        // Showing countdown and info about upcoming flight
        for (let i = 0; i < this.launches.length; i++) {
          var launchDate = new Date(this.launches[i].window_start).getTime();
          if (launchDate > new Date().getTime()) {
            //Showing onlzy upcoming launches
            this.showID = i;

            // Displaying countdown and info
            this.launch_date = this.launches[i].window_start;
            this.upcomingLaunch = this.launches[i];

            break;
          }
        }
      }
      if (!isFirstLoad) {
        event.target.complete();
      }
    })
  }

  // Infinite Scroll
  doInfinite(event) {
    this.loadUpcomingLaunches(false, event);
  }

  // Countdown
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