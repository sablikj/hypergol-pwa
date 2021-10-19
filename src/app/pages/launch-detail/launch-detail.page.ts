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

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");

    this.launch$ = this.apiService.getUpcomingLaunch$(id);
    this.apiService.getUpcomingLaunch$(id).subscribe(data => {
      this.launch = data;
    })

  }

  ngOnInit() {
  }

}
