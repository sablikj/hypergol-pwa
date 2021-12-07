import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rocket } from 'src/app/models/rocket.model';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { StorageService } from 'src/app/services/storage.service';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-rocket-detail',
  templateUrl: './rocket-detail.page.html',
  styleUrls: ['./rocket-detail.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RocketDetailPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  rocket: Rocket;
  id: String;

  constructor(private route: ActivatedRoute, private storage: StorageService) {
    this.id = this.route.snapshot.paramMap.get("id")
    this.loadData();
  }
  ngOnInit() { }

  async loadData() {
    this.rocket = await this.storage.getRocket(this.id);
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
}
