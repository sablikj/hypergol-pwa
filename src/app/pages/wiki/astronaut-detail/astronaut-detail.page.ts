import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Astronaut } from 'src/app/models/astronaut.model';
import { LaunchApiService } from 'src/app/services/launch-api.service';

import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-astronaut-detail',
  templateUrl: './astronaut-detail.page.html',
  styleUrls: ['./astronaut-detail.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AstronautDetailPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  astronaut$: Observable<Astronaut>;
  astronaut: Astronaut;

  constructor(private apiService: LaunchApiService, private route: ActivatedRoute) {
    const id = this.route.snapshot.paramMap.get("id");
    this.astronaut$ = this.apiService.getAstronaut$(id);
    this.apiService.getAstronaut$(id).subscribe(data => {
      this.astronaut = data;
    })
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 60,
    pagination: true,
  }

  ngOnInit() { }

  ngAfterContentChecked() {
    if (this.swiper) {
      this.swiper.updateSwiper({});
    }
  }
}
