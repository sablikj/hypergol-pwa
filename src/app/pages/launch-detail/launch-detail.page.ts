import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LaunchDetail } from 'src/app/models/launchDetail.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';
import { Storage } from '@capacitor/storage';


@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.page.html',
  styleUrls: ['./launch-detail.page.scss'],
})
export class LaunchDetailPage implements OnInit {

  launch$: Observable<LaunchDetail>;
  launch: LaunchDetail;
  launch_date: any;
  countdownHide: boolean;
  inStorage: boolean = false;
  id = this.route.snapshot.paramMap.get("id");

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    this.loadContent();
  }

  ngOnInit() { }

  async loadContent() {
    this.inStorage = await this.checkKeys();

    if (this.inStorage) {
      // Load launch from storage
      this.getLaunch();
    }
    else {
      this.launch$ = this.apiService.getLaunch$(this.id);
      this.apiService.getLaunch$(this.id).subscribe(data => {
        this.launch = data;

        // Save to storage
        this.setLaunch(data);

        // Check for an old launch
        if (new Date(data.window_start).getTime() - new Date().getTime() < -10000000) {
          this.countdownHide = true;
        } else {
          this.launch_date = data.window_start;
        }
      })
    }
  }

  async checkKeys() {
    const keys = (await Storage.keys()).keys;

    if (keys.includes(this.id)) {
      return true;
    } else {
      return false;
    }
  }

  async setLaunch(data) {
    await Storage.set({
      key: this.id,
      value: JSON.stringify(data),
    });
  }

  async getLaunch() {
    const { value } = await Storage.get({
      key: this.id
    });
    this.launch = JSON.parse(value);
  }

  countdown: any;
  x = setInterval(() => {
    var now = new Date().getTime();
    var diff = new Date(this.launch_date).getTime() - now;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    this.countdown = "T -   " + days + "  Days  " + hours + "  Hours  " + minutes + "  Minutes  " + seconds + "  Seconds";

    if (diff < 0) {
      clearInterval(this.x);
      this.countdown = "Launching now!";
    }
  })
}
