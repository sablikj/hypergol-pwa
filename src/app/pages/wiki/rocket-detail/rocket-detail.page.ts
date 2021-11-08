import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Rocket } from 'src/app/models/rocket.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

@Component({
  selector: 'app-rocket-detail',
  templateUrl: './rocket-detail.page.html',
  styleUrls: ['./rocket-detail.page.scss'],
})
export class RocketDetailPage implements OnInit {

  rocket$: Observable<Rocket>;
  rocket: Rocket;
  //REWORK to pass data from wiki page -> no need for another API call
  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");

    this.rocket$ = this.apiService.getRocket$(id);
    this.apiService.getRocket$(id).subscribe(data => {
      this.rocket = data;
    })
  }
  ngOnInit() { }
}
