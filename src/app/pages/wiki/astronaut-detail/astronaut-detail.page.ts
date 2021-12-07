import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Astronaut } from 'src/app/models/astronaut.model';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { StorageService } from 'src/app/services/storage.service';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-astronaut-detail',
  templateUrl: './astronaut-detail.page.html',
  styleUrls: ['./astronaut-detail.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AstronautDetailPage implements OnInit, AfterContentChecked {
  @ViewChild('swiper') swiper: SwiperComponent;

  astronaut: Astronaut;
  id: String;

  constructor(private route: ActivatedRoute, private storage: StorageService) {
    this.id = this.route.snapshot.paramMap.get("id");
    this.loadData();
  }

  async loadData() {
    this.astronaut = await this.storage.getAstronaut(this.id);
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
