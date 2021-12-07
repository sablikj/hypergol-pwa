import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Launch } from '../models/launch.model';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  launches: Launch[] = [];
  upcomingLaunch: Launch;
  launch_date: any;
  showID: number;
  loading: HTMLIonLoadingElement;

  constructor(private storage: StorageService) {
    this.loadData(true, "")
  }

  async loadData(isFirstLoad, event) {
    this.launches = await this.storage.loadUpcomingLaunches(isFirstLoad, event);

    if (isFirstLoad) {
      // Showing countdown and info about upcoming flight
      for (let i = 0; i < this.launches.length; i++) {
        var launchDate = new Date(this.launches[i].window_start).getTime();
        if (launchDate > new Date().getTime()) {
          //Showing only upcoming launches
          this.showID = i;

          // Displaying countdown and info
          this.launch_date = this.launches[i].window_start;
          this.upcomingLaunch = this.launches[i];

          break;
        }
      }
    }
  }

  // Infinite Scroll
  async doInfinite(event) {
    this.launches = this.launches.concat(await this.storage.loadUpcomingLaunches(false, event));
    event.target.complete();
  }

  getTime(launch: Launch) {
    var now = new Date().getTime();
    var distance = new Date(launch.window_start).getTime() - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    var time = "";

    if (days > 0) {
      time = "T - " + days + "  Days  " + hours + "  Hours";
    }
    else {
      time = "T - " + hours + " Hours " + minutes + " Minutes";

    }
    return time;
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