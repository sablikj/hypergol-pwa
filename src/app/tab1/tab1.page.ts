import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
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
  launches$: Observable<Launch[]>;
  upcomingLaunch: Launch;

  launch_date: any;
  showID: number;
  offset = 0;
  data: Launch[] = [];

  loading: HTMLIonLoadingElement;

  constructor(private storage: StorageService, private actionSheetController: ActionSheetController) {
    this.loadData(true, "")
  }

  async doRefresh(event) {
    this.launches = await this.storage.refreshLaunches("launches");
    event.target.complete()
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
    /*
    for (let i = 0; i < this.data.length; i++) {
      this.launches.push(this.data[i]);
    }*/
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