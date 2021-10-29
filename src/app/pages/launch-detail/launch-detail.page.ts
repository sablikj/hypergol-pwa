import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LaunchDetail } from 'src/app/models/launchDetail.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

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

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");

    this.launch$ = this.apiService.getLaunch$(id);
    this.apiService.getLaunch$(id).subscribe(data => {
      this.launch = data;

      // Check for old launch
      if (new Date(data.window_start).getTime() - new Date().getTime() < -10000000) {
        this.countdownHide = true;;
      } else {
        this.launch_date = data.window_start;
      }

    })


  }

  ngOnInit() {
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
