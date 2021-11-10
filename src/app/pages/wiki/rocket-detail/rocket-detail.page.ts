import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Rocket } from 'src/app/models/rocket.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-rocket-detail',
  templateUrl: './rocket-detail.page.html',
  styleUrls: ['./rocket-detail.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RocketDetailPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

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

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 60,
    pagination: true,
  }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }



  ngOnInit() { }
}
