import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Launch } from 'src/app/models/launch.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-launch-detail',
  templateUrl: './launch-detail.page.html',
  styleUrls: ['./launch-detail.page.scss'],
})
export class LaunchDetailPage implements OnInit {

  launch$: Observable<Launch>;
  launch: Launch;
  launch_date: any;

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");

    this.launch$ = this.apiService.getUpcomingLaunch$(id);
    this.apiService.getUpcomingLaunch$(id).subscribe(data => {
      this.launch = data;
      this.launch_date = data.window_start;
    })
  }

  ngOnInit() {
  }

  countdown: any;
  x = setInterval(() => {
    var now = new Date().getTime();
    var distance = new Date(this.launch_date).getTime() - now;

    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    this.countdown = "T -   " + days + "  Days  " + hours + "  Hours  " + minutes + "  Minutes  " + seconds + "  Seconds";

    if (distance < 0) {
      clearInterval(this.x);
      this.countdown = "Launching now!";
    }
  })
}
